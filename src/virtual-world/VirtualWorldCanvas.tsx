import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildSurfaceEnvironment, buildDeepEarthEnvironment, WorldHotspot, EnvironmentBuildResult } from './sceneBuilder.ts';
import { createManiraptoranCreature, CreatureController } from './creatureModel.ts';
import { soundEngine } from '../utils/audioEngine.ts';

export type WorldEnvironmentType = 'surface' | 'deep-earth';
export type CameraMode = 'scout' | 'drone' | 'orbit';
export type TimeOfDay = 'noon' | 'dusk' | 'impact';

interface VirtualWorldCanvasProps {
  onSelectHotspot: (hotspot: WorldHotspot) => void;
  activeEnvironment: WorldEnvironmentType;
  onChangeEnvironment: (env: WorldEnvironmentType) => void;
  cameraMode: CameraMode;
  onChangeCameraMode: (mode: CameraMode) => void;
  timeOfDay: TimeOfDay;
  onChangeTimeOfDay: (tod: TimeOfDay) => void;
}

export const VirtualWorldCanvas: React.FC<VirtualWorldCanvasProps> = ({
  onSelectHotspot,
  activeEnvironment,
  onChangeEnvironment,
  cameraMode,
  onChangeCameraMode,
  timeOfDay,
  onChangeTimeOfDay,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspotNear, setActiveHotspotNear] = useState<WorldHotspot | null>(null);

  // Mutable 3D refs that don't trigger React re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const creatureRef = useRef<CreatureController | null>(null);
  const currentEnvDataRef = useRef<EnvironmentBuildResult | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);

  // Keyboard state for avatar movement
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const playerPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 5));
  const playerRotationRef = useRef<number>(0);

  // Set up scene once
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    // Detect software WebGL guard as requested by skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
    camera.position.set(0, 8, 20);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Environment reflection map
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Lighting rig
    const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x3d352a, 0.6);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    sunLight.position.set(45, 60, 30);
    sunLight.castShadow = !isSoftwareGl;
    if (sunLight.shadow) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 1;
      sunLight.shadow.camera.far = 180;
      sunLight.shadow.camera.left = -50;
      sunLight.shadow.camera.right = 50;
      sunLight.shadow.camera.top = 50;
      sunLight.shadow.camera.bottom = -50;
      sunLight.shadow.bias = -0.0005;
    }
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 3;
    controls.maxDistance = 120;
    controlsRef.current = controls;

    // Player Creature Avatar (Sen / Theropod Scout)
    const creature = createManiraptoranCreature('peak-surface');
    scene.add(creature.mesh);
    creatureRef.current = creature;

    // Key event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === 'e' && activeHotspotNear) {
        onSelectHotspot(activeHotspotNear);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update environment animatables (water, fire, Alchul nodes)
      if (currentEnvDataRef.current) {
        currentEnvDataRef.current.animatables.forEach(a => a.update(delta, elapsed));
      }

      // Avatar Movement & Controls
      const keys = keysRef.current;
      const isShift = keys['shift'];
      const speed = isShift ? 12 : 6;
      let isMoving = false;

      if (cameraMode === 'scout') {
        let moveX = 0;
        let moveZ = 0;

        if (keys['w'] || keys['arrowup']) moveZ -= 1;
        if (keys['s'] || keys['arrowdown']) moveZ += 1;
        if (keys['a'] || keys['arrowleft']) moveX -= 1;
        if (keys['d'] || keys['arrowright']) moveX += 1;

        if (moveX !== 0 || moveZ !== 0) {
          isMoving = true;
          const len = Math.hypot(moveX, moveZ);
          const nx = (moveX / len) * speed * delta;
          const nz = (moveZ / len) * speed * delta;

          // Move relative to camera forward vector
          const camAngle = Math.atan2(
            camera.position.x - playerPosRef.current.x,
            camera.position.z - playerPosRef.current.z
          );

          const rotatedX = nx * Math.cos(camAngle) - nz * Math.sin(camAngle);
          const rotatedZ = nx * Math.sin(camAngle) + nz * Math.cos(camAngle);

          playerPosRef.current.x += rotatedX;
          playerPosRef.current.z += rotatedZ;

          // Target rotation towards movement
          playerRotationRef.current = Math.atan2(rotatedX, rotatedZ) - Math.PI / 2;
        }

        // Keep avatar on bounds
        playerPosRef.current.x = Math.max(-100, Math.min(100, playerPosRef.current.x));
        playerPosRef.current.z = Math.max(-100, Math.min(100, playerPosRef.current.z));

        // Update Creature Model
        if (creature) {
          creature.mesh.visible = true;
          creature.mesh.position.copy(playerPosRef.current);
          creature.mesh.rotation.y = THREE.MathUtils.damp(
            creature.mesh.rotation.y,
            playerRotationRef.current,
            12,
            delta
          );
          creature.update(delta, isMoving, speed);
        }

        // Camera smoothly follows player in scout mode
        const targetCamX = playerPosRef.current.x + Math.sin(playerRotationRef.current + Math.PI / 2) * 9;
        const targetCamZ = playerPosRef.current.z + Math.cos(playerRotationRef.current + Math.PI / 2) * 9;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, playerPosRef.current.y + 4.5, 5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5, delta);
        controls.target.set(playerPosRef.current.x, playerPosRef.current.y + 1.2, playerPosRef.current.z);
      } else if (cameraMode === 'drone') {
        if (creature) creature.mesh.visible = true;
        // Drone controls allow free roaming camera
        controls.update();
      } else if (cameraMode === 'orbit') {
        if (creature) creature.mesh.visible = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        controls.update();
      }

      // Check proximity to hotspots
      if (currentEnvDataRef.current) {
        let nearest: WorldHotspot | null = null;
        let minDist = 12.0;

        currentEnvDataRef.current.hotspots.forEach(hs => {
          const dist = playerPosRef.current.distanceTo(hs.position);
          if (dist < minDist) {
            minDist = dist;
            nearest = hs;
          }
        });
        setActiveHotspotNear(nearest);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Environment (Surface vs Deep Earth)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing environment objects if any
    if (currentEnvDataRef.current) {
      scene.remove(currentEnvDataRef.current.sceneObjects);
    }

    const envData = activeEnvironment === 'surface'
      ? buildSurfaceEnvironment()
      : buildDeepEarthEnvironment();

    scene.add(envData.sceneObjects);
    currentEnvDataRef.current = envData;

    // Reset player position to spawn
    playerPosRef.current.copy(envData.spawnPoint);
    if (creatureRef.current) {
      creatureRef.current.mesh.position.copy(envData.spawnPoint);
    }

    // Set fog and background
    scene.background = envData.fogColor;
    scene.fog = new THREE.FogExp2(envData.fogColor, envData.fogDensity);

    // Sync ambient audio mode to environment
    if (activeEnvironment === 'surface') {
      soundEngine.setMode('wetland');
    } else {
      soundEngine.setMode('deep');
    }
  }, [activeEnvironment]);

  // Update Time of Day Lighting
  useEffect(() => {
    const sunLight = sunLightRef.current;
    const hemiLight = hemiLightRef.current;
    const scene = sceneRef.current;
    if (!sunLight || !hemiLight || !scene) return;

    if (activeEnvironment === 'deep-earth') {
      // Deep cave interior lighting
      sunLight.intensity = 0.2;
      sunLight.color.setHex(0x38bdf8);
      hemiLight.intensity = 0.4;
      hemiLight.color.setHex(0x10b981);
      hemiLight.groundColor.setHex(0x09090b);
      return;
    }

    if (timeOfDay === 'noon') {
      sunLight.intensity = 2.0;
      sunLight.color.setHex(0xffedd5);
      sunLight.position.set(45, 60, 30);
      hemiLight.intensity = 0.6;
      hemiLight.color.setHex(0xbae6fd);
      hemiLight.groundColor.setHex(0x3d352a);
      scene.background = new THREE.Color(0xbae6fd);
      if (scene.fog) scene.fog.color.setHex(0xd6d3d1);
    } else if (timeOfDay === 'dusk') {
      sunLight.intensity = 1.4;
      sunLight.color.setHex(0xf97316);
      sunLight.position.set(70, 15, -40);
      hemiLight.intensity = 0.4;
      hemiLight.color.setHex(0xfb923c);
      hemiLight.groundColor.setHex(0x1c1917);
      scene.background = new THREE.Color(0x451a03);
      if (scene.fog) scene.fog.color.setHex(0x451a03);
    } else if (timeOfDay === 'impact') {
      // 66 Ma Chicxulub horizon flash
      sunLight.intensity = 3.5;
      sunLight.color.setHex(0xffffff);
      sunLight.position.set(-60, 40, -80);
      hemiLight.intensity = 1.0;
      hemiLight.color.setHex(0xef4444);
      hemiLight.groundColor.setHex(0x18181b);
      scene.background = new THREE.Color(0x7f1d1d);
      if (scene.fog) scene.fog.color.setHex(0x7f1d1d);
    }
  }, [timeOfDay, activeEnvironment]);

  // Click on Canvas to raycast inspect
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rendererRef.current || !cameraRef.current || !currentEnvDataRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    // If near a hotspot, trigger it
    if (activeHotspotNear) {
      onSelectHotspot(activeHotspotNear);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-stone-950">
      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Proximity Hotspot Notification Banner */}
      {activeHotspotNear && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => onSelectHotspot(activeHotspotNear)}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-stone-900/90 border border-amber-500/80 text-stone-100 shadow-2xl backdrop-blur-md hover:bg-amber-950 hover:border-amber-400 transition"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">
              {activeHotspotNear.district}:
            </span>
            <span className="text-xs font-serif font-bold text-stone-100">
              {activeHotspotNear.name}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500 text-stone-950 font-bold">
              Press [E] or Click
            </span>
          </button>
        </div>
      )}

      {/* Top Left Environment Watermark */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none bg-stone-950/70 border border-stone-800/80 rounded-xl p-3 backdrop-blur-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-serif font-bold text-xs text-amber-100 uppercase tracking-wider">
            {activeEnvironment === 'surface' ? 'The Braided Reach (~75 Ma)' : 'Deep Earth Sanctuary (Present / Reelfoot)'}
          </span>
        </div>
        <div className="text-[11px] font-mono text-stone-400">
          Avatar: <strong className="text-amber-300">Sen (Appalachian Maniraptoran)</strong> • WASD to Walk
        </div>
      </div>
    </div>
  );
};

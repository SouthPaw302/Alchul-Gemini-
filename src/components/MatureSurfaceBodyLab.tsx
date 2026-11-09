import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Compass, Eye, Hand, Waves, Wind, Footprints, Scan, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';

type Task = 'survey' | 'craft' | 'nursery' | 'council' | 'witness';
type Region = 'whole' | 'head' | 'hands' | 'thorax' | 'pelvis' | 'tail' | 'feet' | 'sensors';
type CameraPreset = 'profile' | 'front' | 'overhead';

const TASKS: { id: Task; label: string; title: string; perspective: string; physical: string }[] = [
  {
    id: 'survey', label: 'Read the river', title: 'The Listener in motion',
    physical: 'Braced wood transmits changes in channel movement to the body; an observer checks the result separately.',
    perspective: '“The stave does not answer as it did yesterday. I can report the change. Someone else must test the danger.”'
  },
  {
    id: 'craft', label: 'Shape a tool', title: 'Precision without human hands',
    physical: 'Three manipulators brace and align a treated wooden member against a stone surface. Materials do the work.',
    perspective: '“If the hand turns too far, the material will break along the wrong seam. Slow is not the same as weak.”'
  },
  {
    id: 'nursery', label: 'Guard a nursery', title: 'Care as spatial intelligence',
    physical: 'The elevated incubating shelf is connected to clean air, water access and a route usable by burdened adults.',
    perspective: '“The threshold is not mine to cross without warning. The young share air that they cannot choose.”'
  },
  {
    id: 'council', label: 'Disagree in council', title: 'A council without a throne',
    physical: 'Two abstract study figures represent distinct witnesses. Orientation, distance and the sounding ground convey disagreement.',
    perspective: '“My prediction is not the same as proof. The other observer can keep the route closed until it has been tested.”'
  },
  {
    id: 'witness', label: 'Record testimony', title: 'The Unclosed Account',
    physical: 'Ordinary arranged stones hold separate reports of an unusual impression. No 3D object depicts Alchul.',
    perspective: '“The place was different for an instant. I know what I experienced; I do not know what caused it.”'
  },
];

const REGIONS: { id: Region; label: string; confidence: string; description: string }[] = [
  { id: 'whole', label: 'Whole body', confidence: 'Working silhouette',
    description: 'A hip-supported, theropod-derived biped with no mammalian torso or human hand. All numeric scene proportions are arbitrary study units, not mass or height estimates.' },
  { id: 'head', label: 'Head & gaze', confidence: 'Ancestral constraints + unverified evolution',
    description: 'A nonhuman toothed cranial profile, mobile neck and forward attention. Actual peak-era skull proportions, visual field and braincase remain unapproved.' },
  { id: 'hands', label: 'Three-digit grip', confidence: 'Three-digit ancestry; evolved grip hypothetical',
    description: 'Individually modeled forelimb digits illustrate bracing and alignment without a primate thumb. Opposition and joint angles are not experimentally reconstructed.' },
  { id: 'thorax', label: 'Breathing system', confidence: 'Comparative theropod respiratory evidence',
    description: 'Thoracic movement represents breathing generally. No specific air-sac count, unidirectional flow, metabolic rate or internal reproductive organ has been established.' },
  { id: 'pelvis', label: 'Balance', confidence: 'Comparative theropod body mechanics',
    description: 'Hip-centered support connects torso, tail and legs. Center of mass, body length and size for this advanced descendant have not been measured.' },
  { id: 'tail', label: 'Tail & display', confidence: 'Retained-tail hypothesis',
    description: 'A tapering tail supports turning and posture signaling in this version. Its existence and length in the peak civilization are still open design decisions.' },
  { id: 'feet', label: 'Feet & contact', confidence: 'Founder inheritance; evolved sensing hypothetical',
    description: 'Digitigrade stance and a raised second-digit claw recall the lineage. Exact peak-era claw form, pad receptors and ground-coupled vibration sensitivity are unspecified.' },
  { id: 'sensors', label: 'Sensory filaments', confidence: 'Entirely speculative external morphology',
    description: 'Sparse neck and jaw filaments are one visualization of a possible sensing system—not fossil evidence or magical radar. Alchul-linked experiences are separate from this physical-sense hypothesis.' },
];

function makeEllipsoid(
  parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number,
  sx: number, sy: number, sz: number, detail = 16
) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, detail, Math.max(10, detail - 4)), material);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function makeLink(
  parent: THREE.Object3D, material: THREE.Material,
  a: [number, number, number], b: [number, number, number], startRadius: number, endRadius: number
) {
  const aVec = new THREE.Vector3(...a);
  const bVec = new THREE.Vector3(...b);
  const axis = bVec.clone().sub(aVec);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(endRadius, startRadius, axis.length(), 9, 1),
    material
  );
  mesh.position.copy(aVec.clone().add(bVec).multiplyScalar(0.5));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize());
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function makeStudyProxy(parent: THREE.Group, x: number, z: number, material: THREE.Material, rotation = 0) {
  const proxy = new THREE.Group();
  proxy.position.set(x, 0, z);
  proxy.rotation.y = rotation;
  makeEllipsoid(proxy, material, 0.1, 1.3, 0, 0.41, 0.24, 0.26, 10);
  makeEllipsoid(proxy, material, 0.72, 1.55, 0, 0.22, 0.16, 0.19, 10);
  makeLink(proxy, material, [-0.2, 1.3, 0], [-1.0, 1.1, 0], 0.16, 0.04);
  for (const s of [-1, 1]) {
    makeLink(proxy, material, [-0.05, 1.27, s * 0.20], [0.08, 0.24, s * 0.25], 0.11, 0.05);
  }
  parent.add(proxy);
  return proxy;
}

type StudyRig = {
  legs: THREE.Group[];
  arms: THREE.Group[];
  tail: THREE.Group;
  head: THREE.Group;
  torso: THREE.Mesh;
  feathers: THREE.Mesh[];
  markers: Map<THREE.Object3D, Region>;
  markerMeshes: THREE.Mesh[];
  studyMaterials: THREE.MeshStandardMaterial[];
  scenes: Record<Task, THREE.Group>;
  bodyRoot: THREE.Group;
};

function constructStudy(scene: THREE.Scene): StudyRig {
  const plumage = new THREE.MeshStandardMaterial({ color: 0x826c4f, roughness: 0.93, flatShading: true });
  const ventral = new THREE.MeshStandardMaterial({ color: 0xbaa582, roughness: 0.94, flatShading: true });
  const keratin = new THREE.MeshStandardMaterial({ color: 0x333c3c, roughness: 0.74 });
  const footMat = new THREE.MeshStandardMaterial({ color: 0x62564d, roughness: 0.9 });
  const featherMat = new THREE.MeshStandardMaterial({ color: 0x473e37, roughness: 0.94, side: THREE.DoubleSide });
  const amber = new THREE.MeshStandardMaterial({ color: 0xe5af70, roughness: 0.7 });
  const studyMaterials = [plumage, ventral, keratin, footMat, featherMat];

  const root = new THREE.Group();
  root.rotation.y = -0.25;
  scene.add(root);

  makeEllipsoid(root, plumage, 0.0, 1.45, 0, 0.39, 0.33, 0.34);
  const torso = makeEllipsoid(root, plumage, 0.42, 1.74, 0, 0.84, 0.32, 0.37, 20);
  torso.rotation.z = 0.08;
  const underside = makeEllipsoid(root, ventral, 0.39, 1.60, 0, 0.63, 0.16, 0.29);
  underside.rotation.z = 0.06;

  const neck = new THREE.Group();
  neck.position.set(0.99, 1.92, 0);
  root.add(neck);
  makeLink(neck, plumage, [0, 0, 0], [0.22, 0.32, 0], 0.22, 0.14);
  const head = new THREE.Group();
  head.position.set(0.24, 0.33, 0);
  neck.add(head);
  makeEllipsoid(head, plumage, 0.16, 0.02, 0, 0.32, 0.22, 0.23);
  makeEllipsoid(head, keratin, 0.48, -0.06, 0, 0.35, 0.105, 0.145, 12);
  makeEllipsoid(head, ventral, 0.43, -0.14, 0, 0.30, 0.05, 0.12);
  for (const sign of [-1, 1]) {
    makeEllipsoid(head, keratin, 0.22, 0.11, sign * 0.18, 0.087, 0.09, 0.035);
    makeEllipsoid(head, amber, 0.24, 0.115, sign * 0.21, 0.052, 0.052, 0.025);
    makeEllipsoid(head, keratin, 0.26, 0.12, sign * 0.232, 0.024, 0.024, 0.012);
    for (let tooth = 0; tooth < 4; tooth++) {
      makeLink(head, ventral, [0.42 + tooth * 0.105, -0.12, sign * 0.099], [0.43 + tooth * 0.105, -0.175, sign * 0.103], 0.014, 0);
    }
  }

  const feathers: THREE.Mesh[] = [];
  for (let feather = 0; feather < 10; feather++) {
    const x = -0.2 + feather * 0.12;
    const fl = makeLink(root, featherMat, [x, 1.98 + Math.sin(feather * 0.25) * 0.08, 0],
      [x - 0.13, 2.2 + Math.sin(feather * 0.4) * 0.12, 0], 0.045, 0);
    feathers.push(fl);
  }

  // Tail base stays attached to the pelvis; individual segment taper is a proposed shape.
  const tail = new THREE.Group();
  tail.position.set(-0.28, 1.52, 0);
  root.add(tail);
  const nodes: [number, number, number][] = [[0, 0, 0], [-0.43, -0.08, 0], [-0.86, -0.13, 0], [-1.25, -0.15, 0], [-1.60, -0.14, 0], [-1.95, -0.12, 0]];
  for (let k = 0; k < nodes.length - 1; k++) {
    makeLink(tail, k < 2 ? plumage : featherMat, nodes[k], nodes[k + 1], 0.22 - k * 0.035, 0.18 - k * 0.035);
  }
  for (let k = 0; k < 6; k++) {
    const x = -1.35 - k * 0.09;
    makeLink(tail, featherMat, [x, 0.02, 0], [x - 0.1, 0.11 + k * 0.018, 0], 0.022, 0);
  }

  const legs: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(-0.07, 1.36, side * 0.24);
    root.add(pivot);
    legs.push(pivot);
    makeLink(pivot, plumage, [0, 0, 0], [0.13, -0.48, side * 0.03], 0.19, 0.13);
    makeEllipsoid(pivot, plumage, 0.13, -0.47, side * 0.03, 0.15, 0.14, 0.12, 12);
    makeLink(pivot, footMat, [0.13, -0.49, side * 0.03], [-0.02, -0.97, side * 0.04], 0.115, 0.075);
    makeLink(pivot, footMat, [-0.02, -0.97, side * 0.04], [0.22, -1.21, side * 0.05], 0.075, 0.043);
    for (let toe = -1; toe <= 1; toe++) {
      const z = side * 0.04 + toe * 0.085;
      makeLink(pivot, footMat, [0.22, -1.21, z], [0.50 + (1 - Math.abs(toe)) * 0.06, -1.24, z + toe * 0.04], 0.049, 0.018);
      makeLink(pivot, keratin, [0.49, -1.24, z + toe * 0.04], [0.61, -1.27, z + toe * 0.05], 0.02, 0);
    }
    // Raised digit II remnant: visual hypothesis for an evolved form, not a fossil joint reconstruction.
    makeLink(pivot, keratin, [0.25, -1.18, side * 0.14], [0.39, -1.04, side * 0.15], 0.045, 0.007);
  }

  const arms: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(0.79, 1.67, side * 0.32);
    root.add(pivot);
    arms.push(pivot);
    makeLink(pivot, plumage, [0, 0, 0], [0.04, -0.39, side * 0.055], 0.14, 0.085);
    makeLink(pivot, footMat, [0.04, -0.39, side * 0.055], [0.38, -0.53, side * 0.07], 0.09, 0.05);
    makeEllipsoid(pivot, footMat, 0.40, -0.52, side * 0.07, 0.11, 0.075, 0.075);
    for (let digit = 0; digit < 3; digit++) {
      const spread = (digit - 1) * 0.07;
      makeLink(pivot, footMat, [0.41, -0.53, side * 0.07 + spread],
        [0.62 + 0.026 * digit, -0.56 + 0.04 * Math.abs(digit - 1), side * 0.07 + spread * 1.5], 0.037, 0.02);
      makeLink(pivot, keratin, [0.62 + 0.026 * digit, -0.56 + 0.04 * Math.abs(digit - 1), side * 0.07 + spread * 1.5],
        [0.70 + 0.024 * digit, -0.59 + 0.05 * Math.abs(digit - 1), side * 0.07 + spread * 1.8], 0.023, 0.002);
    }
  }

  // Sensory-filament placeholder near neck. This is NOT an established anatomical feature.
  for (const side of [-1, 1]) {
    for (let k = 0; k < 3; k++) {
      makeLink(neck, featherMat,
        [0.05 + k * 0.10, 0.2 + k * 0.06, side * 0.13],
        [0.08 + k * 0.11, 0.40 + k * 0.08, side * 0.23],
        0.011, 0.001);
    }
  }

  // Environment fragments are 3D context models, not reconstructions of an excavated site.
  const stone = new THREE.MeshStandardMaterial({ color: 0x63716a, roughness: 0.98, flatShading: true });
  const wood = new THREE.MeshStandardMaterial({ color: 0x8b7958, roughness: 0.9, flatShading: true });
  const water = new THREE.MeshStandardMaterial({ color: 0x4f8390, transparent: true, opacity: 0.60, roughness: 0.25 });
  const proxy = new THREE.MeshStandardMaterial({ color: 0x9c9888, transparent: true, opacity: 0.45, depthWrite: false, roughness: 1 });
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 0.15, 56), stone);
  platform.position.y = -0.09;
  platform.receiveShadow = true;
  scene.add(platform);
  const groundGrid = new THREE.GridHelper(7, 14, 0x546961, 0x42514b);
  groundGrid.position.y = 0.003;
  scene.add(groundGrid);

  const scenes = {} as Record<Task, THREE.Group>;
  for (const task of TASKS) {
    scenes[task.id] = new THREE.Group();
    scene.add(scenes[task.id]);
  }

  // Survey: water margin and a pair of resonant staves.
  const waterFloor = new THREE.Mesh(new THREE.CircleGeometry(0.78, 40), water);
  waterFloor.rotation.x = -Math.PI / 2;
  waterFloor.position.set(2.2, 0.018, 0.55);
  scenes.survey.add(waterFloor);
  for (const z of [0.25, 0.80]) {
    makeLink(scenes.survey, wood, [2.1, 0.02, z], [2.1, 1.28, z], 0.056, 0.038);
    makeEllipsoid(scenes.survey, amber, 2.1, 0.87, z, 0.08, 0.035, 0.08);
  }
  makeStudyProxy(scenes.survey, 2.25, -1.3, proxy, 1.0);

  // Precision material work is done with supported and braced objects.
  const workTable = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.20, 0.62), wood);
  workTable.position.set(2.1, 0.67, 0);
  scenes.craft.add(workTable);
  for (const s of [-1, 1]) makeLink(scenes.craft, wood, [1.72, 0.05, s * 0.22], [1.72, 0.64, s * 0.22], 0.085, 0.07);
  const blank = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.13, 0.13), stone);
  blank.position.set(2.17, 0.86, 0);
  blank.rotation.z = -0.13;
  scenes.craft.add(blank);

  const nursery = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, 0.42, 20), stone);
  nursery.position.set(2.2, 0.22, 0.4);
  scenes.nursery.add(nursery);
  // One schematic egg-shaped specimen, not a canonical clutch or shell anatomy.
  makeEllipsoid(scenes.nursery, ventral, 2.2, 0.58, 0.4, 0.25, 0.32, 0.22);
  for (const z of [-0.75, 1.3]) {
    makeLink(scenes.nursery, wood, [1.6, 0.2, z], [2.8, 0.2, z], 0.045, 0.045);
  }

  makeStudyProxy(scenes.council, 2.0, -1.2, proxy, 1.6);
  makeStudyProxy(scenes.council, 1.95, 1.25, proxy, -1.6);
  for (let j = 0; j < 4; j++) {
    makeLink(scenes.council, wood, [1.7 + j * 0.2, 0.05, 0], [1.7 + j * 0.2, 0.17, 0], 0.07, 0.04);
  }

  for (let j = 0; j < 6; j++) {
    const a = j / 6 * Math.PI * 2;
    const x = 2.0 + Math.cos(a) * 0.76;
    const z = Math.sin(a) * 0.76;
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), stone);
    rock.position.set(x, 0.11, z);
    scenes.witness.add(rock);
  }
  for (let k = 0; k < 3; k++) {
    const tile = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.40), wood);
    tile.position.set(2.0 + (k - 1) * 0.26, 0.07, 0);
    tile.rotation.y = k * 0.2;
    scenes.witness.add(tile);
  }

  const markerMat = new THREE.MeshBasicMaterial({ color: 0xf0c379, depthTest: false });
  const markers = new Map<THREE.Object3D, Region>();
  const markerMeshes: THREE.Mesh[] = [];
  const dots: [Region, THREE.Object3D, number, number, number][] = [
    ['head', head, 0.24, 0.43, 0],
    ['hands', arms[1], 0.53, -0.38, 0.13],
    ['thorax', root, 0.45, 2.02, 0.26],
    ['pelvis', root, -0.2, 1.59, 0.36],
    ['tail', tail, -1.18, 0.02, 0.15],
    ['feet', legs[1], 0.42, -1.08, 0.15],
    ['sensors', neck, 0.18, 0.42, 0.20],
  ];
  for (const [name, parent, x, y, z] of dots) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.071, 10, 10), markerMat);
    dot.position.set(x, y, z);
    dot.renderOrder = 10;
    parent.add(dot);
    markers.set(dot, name);
    markerMeshes.push(dot);
  }

  return { legs, arms, tail, head, torso, feathers, markers, markerMeshes, studyMaterials, scenes, bodyRoot: root };
}

export const MatureSurfaceBodyLab: React.FC<{ onOpenCodexDoc?: (path: string) => void }> = ({ onOpenCodexDoc }) => {
  const mount = useRef<HTMLDivElement | null>(null);
  const rig = useRef<StudyRig | null>(null);
  const taskRef = useRef<Task>('survey');
  const structureRef = useRef(false);
  const markersRef = useRef(true);
  const cameraPresetRef = useRef<CameraPreset | null>('profile');

  const [task, setTask] = useState<Task>('survey');
  const [region, setRegion] = useState<Region>('whole');
  const [showStructure, setShowStructure] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('profile');

  useEffect(() => { taskRef.current = task; }, [task]);
  useEffect(() => { structureRef.current = showStructure; }, [showStructure]);
  useEffect(() => { markersRef.current = showMarkers; }, [showMarkers]);
  useEffect(() => { cameraPresetRef.current = cameraPreset; }, [cameraPreset]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x122323);
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(5.0, 3.0, 7.0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.2, 1.3, 0);
    controls.enableDamping = true;
    controls.minDistance = 3.0;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI * 0.93;

    scene.add(new THREE.HemisphereLight(0xa9c5b5, 0x3f362c, 2.0));
    const light = new THREE.DirectionalLight(0xffe6c3, 3.0);
    light.position.set(4, 9, 6);
    light.castShadow = true;
    scene.add(light);
    const fill = new THREE.DirectionalLight(0x86b8ac, 0.9);
    fill.position.set(-5, 4, -6);
    scene.add(fill);

    const specimen = constructStudy(scene);
    rig.current = specimen;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(specimen.markerMeshes, false)[0];
      if (hit) {
        const name = specimen.markers.get(hit.object);
        if (name) setRegion(name);
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    const onStart = () => { cameraPresetRef.current = null; };
    controls.addEventListener('start', onStart);

    const resize = () => {
      const width = host.clientWidth || 600;
      const height = host.clientHeight || 440;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      const t = clock.getElapsedTime();
      const activity = taskRef.current;
      for (const item of TASKS) specimen.scenes[item.id].visible = activity === item.id;
      for (const mark of specimen.markerMeshes) mark.visible = markersRef.current;
      for (const mat of specimen.studyMaterials) mat.wireframe = structureRef.current;
      const effort = activity === 'survey' ? 0.24 : activity === 'craft' ? 0.4 : activity === 'nursery' ? 0.14 : activity === 'council' ? 0.23 : 0.08;
      specimen.legs[0].rotation.z = -0.03 + Math.sin(t * 1.1) * effort * 0.12;
      specimen.legs[1].rotation.z = 0.03 - Math.sin(t * 1.1) * effort * 0.12;
      specimen.arms[0].rotation.z = activity === 'craft' ? -0.45 : activity === 'nursery' ? -0.10 : activity === 'witness' ? 0.2 : -0.22;
      specimen.arms[1].rotation.z = activity === 'craft' ? -0.57 : activity === 'survey' ? -0.31 : activity === 'council' ? 0.09 : -0.15;
      specimen.tail.rotation.y = Math.sin(t * 0.75) * (activity === 'council' ? 0.10 : 0.045);
      specimen.head.rotation.y = Math.sin(t * 0.55) * 0.11;
      specimen.head.rotation.z = activity === 'survey' ? -0.1 : activity === 'nursery' ? -0.15 : 0.03;
      specimen.torso.scale.y = 0.32 + Math.sin(t * 1.5) * 0.009;
      for (let j = 0; j < specimen.feathers.length; j++) {
        specimen.feathers[j].rotation.x = Math.sin(t * 0.75 + j * 0.32) * 0.035;
      }
      const preset = cameraPresetRef.current;
      if (preset) {
        const dest = preset === 'profile' ? new THREE.Vector3(3.5, 2.6, 7.2)
          : preset === 'front' ? new THREE.Vector3(8.5, 2.3, 0)
          : new THREE.Vector3(1.0, 9, 4.0);
        camera.position.lerp(dest, 0.045);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.removeEventListener('start', onStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      scene.traverse(o => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) m.dispose();
        }
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
      rig.current = null;
    };
  }, []);

  const selected = REGIONS.find(r => r.id === region) || REGIONS[0];
  const current = TASKS.find(t => t.id === task) || TASKS[0];

  return (
    <section className="rounded-2xl border border-amber-800/50 bg-stone-900/30 overflow-hidden" aria-labelledby="tesh-3d-title">
      <div className="p-5 sm:p-6 border-b border-stone-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono tracking-wide uppercase text-amber-400">Interactive anatomical & lived-world study</span>
          <span className="text-[11px] text-stone-400 border border-stone-700 rounded-lg px-2 py-1">Provisional · not anatomical canon</span>
        </div>
        <h3 id="tesh-3d-title" className="font-serif text-2xl text-amber-100 font-bold">Tesh — one possible mature surface individual</h3>
        <p className="text-sm text-stone-300 max-w-4xl">
          A hip-balanced descendant with three working digits, a proposed retained tail, and an unratified sensory profile. Drag the study to orbit; select gold nodes or anatomical topics. Switch contexts to see how biology becomes culture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(285px,1fr)]">
        <div className="min-w-0 relative">
          <div ref={mount} className="h-[420px] sm:h-[520px] w-full" aria-label="Rotatable 3D model of a hypothetical mature Alchul surface individual, with task scenes"/>
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {(['profile', 'front', 'overhead'] as CameraPreset[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => { setCameraPreset(p); cameraPresetRef.current = p; }}
                className={'text-[10px] px-2 py-1.5 rounded-md border ' + (cameraPreset === p ? 'bg-amber-950 border-amber-700 text-amber-200' : 'bg-stone-950/85 border-stone-700 text-stone-200')}
              >
                {p === 'profile' ? 'Profile' : p === 'front' ? 'Head-on' : 'Overhead'}
              </button>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[11px]">
            <button type="button" aria-pressed={showMarkers} onClick={() => setShowMarkers(v => !v)}
              className="rounded-lg border border-stone-600 bg-stone-950/90 px-3 py-2 text-stone-200">
              <Scan className="w-3.5 h-3.5 inline mr-1" /> {showMarkers ? 'Hide inspection nodes' : 'Show inspection nodes'}
            </button>
            <button type="button" aria-pressed={showStructure} onClick={() => setShowStructure(v => !v)}
              className="rounded-lg border border-stone-600 bg-stone-950/90 px-3 py-2 text-stone-200">
              <Eye className="w-3.5 h-3.5 inline mr-1" /> {showStructure ? 'Surface study' : 'Structural wireframe'}
            </button>
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-stone-800 p-4 sm:p-5 flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-semibold text-amber-200 mb-2">Inspection focus</h4>
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map(r => (
                <button key={r.id} type="button" onClick={() => setRegion(r.id)}
                  className={'text-xs px-2.5 py-1.5 border rounded-md ' + (region === r.id
                    ? 'border-amber-600 bg-amber-950/70 text-amber-100' : 'border-stone-700 bg-stone-900 text-stone-300')}
                  aria-pressed={region === r.id}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-stone-950 border border-stone-800 p-4 space-y-2 min-h-[140px]" aria-live="polite">
            <p className="font-serif text-base font-bold text-amber-100">{selected.label}</p>
            <p className="text-xs font-mono text-sky-300">{selected.confidence}</p>
            <p className="text-sm text-stone-300 leading-relaxed">{selected.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-200 mb-2">Move through a lived scene</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {TASKS.map(t => (
                <button key={t.id} type="button" onClick={() => setTask(t.id)}
                  aria-pressed={task === t.id}
                  className={'text-left px-3 py-2 border rounded-lg text-xs ' + (task === t.id
                    ? 'border-amber-600 bg-amber-950/60 text-amber-100' : 'border-stone-700 bg-stone-950 text-stone-300')}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-stone-950 border border-stone-800 p-4 space-y-2" aria-live="polite">
            <h4 className="font-serif font-bold text-amber-100">{current.title}</h4>
            <p className="text-xs text-stone-400">{current.physical}</p>
            <p className="text-sm text-stone-200 italic leading-relaxed">{current.perspective}</p>
          </div>
          <p className="flex items-start gap-2 text-[11px] text-stone-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Visual geometry uses arbitrary proportions; the proxy figures, egg specimen, respiratory motion and task-specific culture are not approved biological facts.
          </p>
          {onOpenCodexDoc && (
            <button type="button" onClick={() => onOpenCodexDoc('LORE/INDIVIDUAL_01_TESH_BODY_AND_LIFE.md')}
              className="flex items-center gap-2 text-xs text-sky-300 hover:text-sky-200 underline underline-offset-2">
              <BookOpen className="w-4 h-4"/> Open full anatomy and culture dossier
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

import * as THREE from 'three';

export interface CreatureController {
  mesh: THREE.Group;
  update: (delta: number, isMoving: boolean, speed: number) => void;
  lookAt: (target: THREE.Vector3) => void;
}

export function createManiraptoranCreature(type: 'founder' | 'peak-surface' | 'subterranean' = 'peak-surface'): CreatureController {
  const root = new THREE.Group();

  // Materials
  const plumageColor = type === 'subterranean' ? 0x2dd4bf : type === 'peak-surface' ? 0xa16207 : 0x78350f;
  const secondaryColor = type === 'subterranean' ? 0x0f766e : 0x451a03;
  const skinColor = type === 'subterranean' ? 0x1e293b : 0x292524;
  const eyeColor = type === 'subterranean' ? 0x38bdf8 : 0xf59e0b;

  // Feathers / Mantle
  const mantleMat = new THREE.MeshStandardMaterial({
    color: plumageColor,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });

  const accentFeatherMat = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    roughness: 0.75,
    metalness: 0.1,
  });

  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.9,
    metalness: 0.0,
  });

  const clawMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    roughness: 0.3,
    metalness: 0.4,
  });

  const eyeMat = new THREE.MeshStandardMaterial({
    color: eyeColor,
    roughness: 0.1,
    metalness: 0.8,
    emissive: type === 'subterranean' ? eyeColor : 0x000000,
    emissiveIntensity: type === 'subterranean' ? 0.6 : 0,
  });

  // Pelvis / Torso Center (Base anchor)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 1.1; // Hip height
  root.add(torsoGroup);

  // Main Torso (Horizontal theropod posture)
  const bodyGeo = new THREE.ConeGeometry(0.38, 1.1, 7);
  bodyGeo.rotateZ(Math.PI / 2);
  const bodyMesh = new THREE.Mesh(bodyGeo, mantleMat);
  bodyMesh.scale.set(1.2, 0.9, 0.8);
  bodyMesh.castShadow = true;
  torsoGroup.add(bodyMesh);

  // Neck and Head Group
  const neckGroup = new THREE.Group();
  neckGroup.position.set(0.55, 0.2, 0);
  torsoGroup.add(neckGroup);

  // S-curved theropod neck
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.22, 0.5, 6);
  neckGeo.rotateZ(-Math.PI / 4);
  const neckMesh = new THREE.Mesh(neckGeo, mantleMat);
  neckMesh.position.set(0.18, 0.15, 0);
  neckMesh.castShadow = true;
  neckGroup.add(neckMesh);

  // Head Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0.38, 0.32, 0);
  neckGroup.add(headGroup);

  // Cranium (elongated, narrow theropod snout)
  const craniumGeo = new THREE.BoxGeometry(0.42, 0.22, 0.24);
  const craniumMesh = new THREE.Mesh(craniumGeo, mantleMat);
  craniumMesh.position.set(0.1, 0.02, 0);
  headGroup.add(craniumMesh);

  // Snout (toothed, tapering, NOT a beak!)
  const snoutGeo = new THREE.ConeGeometry(0.12, 0.35, 5);
  snoutGeo.rotateZ(-Math.PI / 2);
  const snoutMesh = new THREE.Mesh(snoutGeo, skinMat);
  snoutMesh.position.set(0.42, -0.02, 0);
  headGroup.add(snoutMesh);

  // Lower Jaw
  const jawGeo = new THREE.BoxGeometry(0.32, 0.06, 0.16);
  const jawMesh = new THREE.Mesh(jawGeo, skinMat);
  jawMesh.position.set(0.36, -0.1, 0);
  headGroup.add(jawMesh);

  // Eyes (Forward-facing predatory binocular orbits)
  const eyeGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(0.15, 0.06, 0.13);
  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  rightEye.position.set(0.15, 0.06, -0.13);
  headGroup.add(leftEye, rightEye);

  // Sensory filaments / crest on back of neck/head
  const crestGeo = new THREE.ConeGeometry(0.08, 0.4, 4);
  crestGeo.rotateZ(Math.PI / 3);
  const crestMesh = new THREE.Mesh(crestGeo, accentFeatherMat);
  crestMesh.position.set(-0.05, 0.15, 0);
  headGroup.add(crestMesh);

  // Forelimbs / Grasping 3-fingered hands with Pennaceous Wing Fan
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(0.35, -0.1, 0.28);
  torsoGroup.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, -0.1, -0.28);
  torsoGroup.add(rightArmGroup);

  [leftArmGroup, rightArmGroup].forEach((arm, i) => {
    const side = i === 0 ? 1 : -1;
    // Upper arm (humerus)
    const upperArmGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.35, 5);
    upperArmGeo.rotateZ(-Math.PI / 6);
    const upperArm = new THREE.Mesh(upperArmGeo, mantleMat);
    upperArm.position.set(0.1, -0.12, 0.05 * side);
    arm.add(upperArm);

    // Forearm (radius/ulna with semilunate carpal)
    const forearmGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.35, 5);
    forearmGeo.rotateZ(Math.PI / 4);
    const forearm = new THREE.Mesh(forearmGeo, skinMat);
    forearm.position.set(0.24, -0.3, 0.05 * side);
    arm.add(forearm);

    // Pennaceous Wing Feathers (attached to forearm)
    const wingGeo = new THREE.PlaneGeometry(0.45, 0.35);
    wingGeo.rotateX(Math.PI / 2);
    const wingFeathers = new THREE.Mesh(wingGeo, accentFeatherMat);
    wingFeathers.position.set(0.18, -0.25, 0.12 * side);
    wingFeathers.rotation.y = 0.2 * side;
    arm.add(wingFeathers);

    // Three grasping functional digits with recurved claws (Digits I, II, III)
    for (let d = 0; d < 3; d++) {
      const fingerGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.14, 4);
      fingerGeo.rotateZ(-Math.PI / 3);
      const finger = new THREE.Mesh(fingerGeo, skinMat);
      finger.position.set(0.38 + d * 0.03, -0.42, (d - 1) * 0.04 * side);
      
      const clawGeo = new THREE.ConeGeometry(0.025, 0.08, 4);
      clawGeo.rotateZ(Math.PI / 2);
      const claw = new THREE.Mesh(clawGeo, clawMat);
      claw.position.set(0.45 + d * 0.03, -0.47, (d - 1) * 0.04 * side);
      arm.add(finger, claw);
    }
  });

  // Hindlimbs (Powerful digitigrade legs with elevated 2nd sickle claw)
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-0.1, 0, 0.26);
  torsoGroup.add(leftLegGroup);

  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(-0.1, 0, -0.26);
  torsoGroup.add(rightLegGroup);

  const legs = [leftLegGroup, rightLegGroup].map((leg, i) => {
    const side = i === 0 ? 1 : -1;
    // Thigh (Femur, heavily muscled)
    const thighGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.45, 6);
    thighGeo.rotateZ(-0.3);
    const thigh = new THREE.Mesh(thighGeo, mantleMat);
    thigh.position.set(0.05, -0.2, 0);
    leg.add(thigh);

    // Shin (Tibia/Fibula, long digitigrade element)
    const shinGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.5, 6);
    shinGeo.rotateZ(0.4);
    const shin = new THREE.Mesh(shinGeo, skinMat);
    shin.position.set(-0.06, -0.55, 0);
    leg.add(shin);

    // Metatarsus (Foot shank lifted off ground)
    const tarsusGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.4, 5);
    tarsusGeo.rotateZ(-0.4);
    const tarsus = new THREE.Mesh(tarsusGeo, skinMat);
    tarsus.position.set(0.08, -0.9, 0);
    leg.add(tarsus);

    // Foot & Toes on ground
    const footGroup = new THREE.Group();
    footGroup.position.set(0.2, -1.06, 0);
    leg.add(footGroup);

    // Outer weight-bearing Toes (Digits III & IV)
    const toeGeo = new THREE.BoxGeometry(0.22, 0.04, 0.06);
    const toe3 = new THREE.Mesh(toeGeo, skinMat);
    toe3.position.set(0.05, 0, 0.04 * side);
    const toe4 = new THREE.Mesh(toeGeo, skinMat);
    toe4.position.set(0.03, 0, -0.04 * side);
    footGroup.add(toe3, toe4);

    // Famous HYPEREXTENDED SICKLE CLAW on Digit II (Held lifted off the substrate)
    const sickleDigit = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 4);
    sickleDigit.rotateZ(Math.PI / 4);
    const sickleDigitMesh = new THREE.Mesh(sickleDigit, skinMat);
    sickleDigitMesh.position.set(0.04, 0.08, 0.08 * side);

    const sickleClawGeo = new THREE.TorusGeometry(0.07, 0.022, 5, 8, Math.PI / 1.5);
    sickleClawGeo.rotateY(Math.PI / 2);
    sickleClawGeo.rotateZ(-Math.PI / 4);
    const sickleClaw = new THREE.Mesh(sickleClawGeo, clawMat);
    sickleClaw.position.set(0.08, 0.12, 0.08 * side);
    footGroup.add(sickleDigitMesh, sickleClaw);

    return { legGroup: leg, thigh, shin, footGroup };
  });

  // Long Counterbalancing Tail
  const tailGroup = new THREE.Group();
  tailGroup.position.set(-0.55, 0.1, 0);
  torsoGroup.add(tailGroup);

  // Stiffened tail segments with vertebrae rod logic
  const tailSegments: THREE.Group[] = [];
  let prevSeg = tailGroup;
  for (let s = 0; s < 5; s++) {
    const segGroup = new THREE.Group();
    segGroup.position.set(-0.35, 0, 0);
    const segGeo = new THREE.ConeGeometry(0.16 - s * 0.025, 0.42, 6);
    segGeo.rotateZ(-Math.PI / 2);
    const segMesh = new THREE.Mesh(segGeo, s > 2 ? accentFeatherMat : mantleMat);
    segGroup.add(segMesh);
    prevSeg.add(segGroup);
    prevSeg = segGroup;
    tailSegments.push(segGroup);
  }

  // Tail Feather Fan (Terminal fan for balance and visual communication)
  const tailFanGeo = new THREE.PlaneGeometry(0.65, 0.5);
  tailFanGeo.rotateX(Math.PI / 2);
  const tailFan = new THREE.Mesh(tailFanGeo, accentFeatherMat);
  tailFan.position.set(-0.25, 0, 0);
  prevSeg.add(tailFan);

  // Shadow grounding circle
  const shadowGeo = new THREE.CircleGeometry(0.9, 16);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.position.y = 0.02;
  root.add(shadowPlane);

  let animTime = 0;

  return {
    mesh: root,
    update: (delta: number, isMoving: boolean, speed: number) => {
      animTime += delta * (isMoving ? 8 * (speed / 4) : 2);

      if (isMoving) {
        // Running gait: alternating leg swing and body bob
        legs[0].legGroup.rotation.z = Math.sin(animTime) * 0.6;
        legs[1].legGroup.rotation.z = -Math.sin(animTime) * 0.6;

        // Torso bobbing and slight horizontal pitch
        torsoGroup.position.y = 1.1 + Math.abs(Math.sin(animTime * 2)) * 0.08;
        torsoGroup.rotation.z = -0.08 + Math.sin(animTime * 2) * 0.03;

        // Arms tucked or balancing
        leftArmGroup.rotation.z = Math.sin(animTime) * 0.25;
        rightArmGroup.rotation.z = -Math.sin(animTime) * 0.25;

        // Tail counter-sway
        tailSegments.forEach((seg, idx) => {
          seg.rotation.y = Math.sin(animTime - idx * 0.4) * 0.06;
          seg.rotation.z = Math.cos(animTime * 2 - idx * 0.3) * 0.03;
        });

        // Head stability (horizontal predator gaze)
        headGroup.rotation.z = -torsoGroup.rotation.z * 0.8;
      } else {
        // Idle breathing and alert scouting
        torsoGroup.position.y = 1.1 + Math.sin(animTime * 1.5) * 0.02;
        torsoGroup.rotation.z = Math.sin(animTime * 1.2) * 0.01;

        legs[0].legGroup.rotation.z = 0;
        legs[1].legGroup.rotation.z = 0;

        leftArmGroup.rotation.z = Math.sin(animTime * 1.8) * 0.05;
        rightArmGroup.rotation.z = -Math.sin(animTime * 1.8) * 0.05;

        // Subtle alert head turns
        headGroup.rotation.y = Math.sin(animTime * 0.7) * 0.15;
        headGroup.rotation.x = Math.sin(animTime * 1.1) * 0.05;

        // Gentle tail sway
        tailSegments.forEach((seg, idx) => {
          seg.rotation.y = Math.sin(animTime * 1.2 - idx * 0.5) * 0.03;
        });
      }
    },
    lookAt: (target: THREE.Vector3) => {
      headGroup.lookAt(target);
    }
  };
}

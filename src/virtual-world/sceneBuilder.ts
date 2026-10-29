import * as THREE from 'three';

export interface WorldHotspot {
  id: string;
  name: string;
  position: THREE.Vector3;
  district: string;
  category: string;
  shortDesc: string;
  lore: string;
  actionPrompt: string;
}

export interface EnvironmentBuildResult {
  sceneObjects: THREE.Group;
  waterMeshes: THREE.Mesh[];
  animatables: { update: (delta: number, elapsed: number) => void }[];
  hotspots: WorldHotspot[];
  spawnPoint: THREE.Vector3;
  fogColor: THREE.Color;
  fogDensity: number;
  skyColor: number;
  groundColor: number;
}

export function buildSurfaceEnvironment(): EnvironmentBuildResult {
  const group = new THREE.Group();
  const waterMeshes: THREE.Mesh[] = [];
  const animatables: { update: (delta: number, elapsed: number) => void }[] = [];
  const hotspots: WorldHotspot[] = [];

  // 1. Procedural Terrain with Braided River & Terraces
  const terrainGeo = new THREE.PlaneGeometry(240, 240, 64, 64);
  terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    // River meander channel: along x=-30 to x=-10
    const riverCenter = Math.sin(z * 0.04) * 15 - 20;
    const distToRiver = Math.abs(x - riverCenter);

    let y = 0;
    if (distToRiver < 10) {
      // River channel depression
      y = -1.2 - Math.cos((distToRiver / 10) * Math.PI) * 0.8;
    } else {
      // Floodplain rising toward living terraces
      const terraceHeight = Math.max(0, (x - 5) * 0.12);
      const moundNoise = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 0.8;
      y = Math.min(6, terraceHeight + moundNoise);
    }

    pos.setY(i, y);
  }
  terrainGeo.computeVertexNormals();

  // Terrain material with Cretaceous soil, moss, and sandy loam
  const terrainMat = new THREE.MeshStandardMaterial({
    color: 0x3d352a,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true,
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.receiveShadow = true;
  group.add(terrainMesh);

  // 2. Animated River Water
  const riverWaterGeo = new THREE.PlaneGeometry(35, 230, 32, 32);
  riverWaterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.15,
    metalness: 0.85,
    transparent: true,
    opacity: 0.75,
  });
  const waterMesh = new THREE.Mesh(riverWaterGeo, waterMat);
  waterMesh.position.set(-20, -0.6, 0);
  group.add(waterMesh);
  waterMeshes.push(waterMesh);

  // Water animation
  animatables.push({
    update: (_, elapsed) => {
      waterMesh.position.y = -0.6 + Math.sin(elapsed * 1.5) * 0.04;
      const wPos = riverWaterGeo.attributes.position;
      for (let i = 0; i < wPos.count; i++) {
        const u = wPos.getX(i);
        const v = wPos.getZ(i);
        wPos.setY(i, Math.sin(u * 0.4 + elapsed * 2) * 0.08 + Math.cos(v * 0.3 + elapsed * 1.8) * 0.06);
      }
      riverWaterGeo.computeVertexNormals();
      riverWaterGeo.attributes.position.needsUpdate = true;
    }
  });

  // 3. Submerged Acoustic Sensing Staves (District A)
  const staveMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.7 });
  for (let s = -3; s <= 3; s++) {
    const staveGroup = new THREE.Group();
    staveGroup.position.set(-20 + (s % 2) * 4, -0.5, s * 22);

    const staveGeo = new THREE.CylinderGeometry(0.12, 0.15, 3.5, 6);
    const staveMesh = new THREE.Mesh(staveGeo, staveMat);
    staveMesh.position.y = 1.0;
    staveGroup.add(staveMesh);

    // Vibration detection ring
    const ringGeo = new THREE.TorusGeometry(0.5, 0.03, 4, 16);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.2;
    staveGroup.add(ringMesh);

    group.add(staveGroup);
  }

  hotspots.push({
    id: 'sensing-stave',
    name: 'Acoustic River Sounding Staves',
    position: new THREE.Vector3(-20, 0.5, 0),
    district: 'Upstream Sensing Reach (A)',
    category: 'Geological & Hydraulic Sensing',
    shortDesc: 'Submerged timber staves driven into bedrock to detect upstream bank collapse shocks.',
    lore: 'Sen and Eru read the river weight through these staves. The wood shivers continuously before collapsing banks upstream shed their silt layers.',
    actionPrompt: 'Inspect acoustic resonance & silt telemetry'
  });

  // 4. Living Mounds & Elevated Walkways (District B)
  const moundMat = new THREE.MeshStandardMaterial({ color: 0x2e2318, roughness: 0.95 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.8 });

  for (let m = 0; m < 5; m++) {
    const mx = 20 + (m % 2) * 15;
    const mz = (m - 2) * 25;
    const mound = new THREE.Group();
    mound.position.set(mx, 1.2, mz);

    // Earthen dome
    const domeGeo = new THREE.SphereGeometry(6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMesh = new THREE.Mesh(domeGeo, moundMat);
    domeMesh.scale.set(1.4, 0.6, 1.2);
    domeMesh.castShadow = true;
    mound.add(domeMesh);

    // Curved entry arch designed for theropod tail clearance
    const archGeo = new THREE.TorusGeometry(1.4, 0.25, 6, 8, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, woodMat);
    archMesh.position.set(0, 0.2, 5.2);
    mound.add(archMesh);

    group.add(mound);
  }

  // Elevated Walkway connecting mounds for egg-bearing adults
  const walkwayGeo = new THREE.BoxGeometry(4, 0.3, 80);
  const walkway = new THREE.Mesh(walkwayGeo, woodMat);
  walkway.position.set(28, 2.5, 0);
  group.add(walkway);

  hotspots.push({
    id: 'living-mounds',
    name: 'Living Banks & Habitation Mounds',
    position: new THREE.Vector3(20, 2.5, 0),
    district: 'Living Banks (B)',
    category: 'Theropod Architecture',
    shortDesc: 'Living earthen shelters reinforced with woven conifer roots and elevated non-primate walkways.',
    lore: 'These mounds have sheltered generations. Elevated walkways allow egg-burdened adults like Eru to traverse without straining deep abdominal ligaments.',
    actionPrompt: 'Examine root reinforcement & tail clearances'
  });

  // 5. Nursery & Incubation Vault (District C)
  const nurseryGroup = new THREE.Group();
  nurseryGroup.position.set(50, 4.2, -20);

  const vaultGeo = new THREE.CylinderGeometry(8, 10, 5, 12);
  const vaultMat = new THREE.MeshStandardMaterial({ color: 0x572d15, roughness: 0.9 });
  const vaultMesh = new THREE.Mesh(vaultGeo, vaultMat);
  vaultMesh.castShadow = true;
  nurseryGroup.add(vaultMesh);

  // Warm thermal vent glow from incubation chambers
  const nurseryLight = new THREE.PointLight(0xf59e0b, 1.5, 15);
  nurseryLight.position.set(0, 1, 0);
  nurseryGroup.add(nurseryLight);

  // Model eggs in nest
  const eggGeo = new THREE.SphereGeometry(0.35, 12, 12);
  eggGeo.scale(0.8, 1.4, 0.8);
  const eggMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 });
  for (let e = 0; e < 6; e++) {
    const egg = new THREE.Mesh(eggGeo, eggMat);
    const angle = (e / 6) * Math.PI * 2;
    egg.position.set(Math.cos(angle) * 1.8, 0.3, Math.sin(angle) * 1.8);
    egg.rotation.z = 0.3;
    nurseryGroup.add(egg);
  }

  group.add(nurseryGroup);

  hotspots.push({
    id: 'nursery-vault',
    name: 'Incubation Grounds & Embryo Beds',
    position: new THREE.Vector3(50, 4.5, -20),
    district: 'Nursery & Incubation Grounds (C)',
    category: 'Reproductive Biology',
    shortDesc: 'Thermal incubation chambers maintaining 32°C for the final 25% of development.',
    lore: 'Embryos develop internally for approximately 75% of gestation before hard shells are laid here for final acoustic conditioning and hatching.',
    actionPrompt: 'Inspect internal egg retention vaults'
  });

  // 6. Harvest & Fermentation Commons (District D)
  const harvestGroup = new THREE.Group();
  harvestGroup.position.set(15, 1.5, 45);

  const basinGeo = new THREE.CylinderGeometry(3.5, 3.0, 1.2, 12);
  const basinMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
  const basin = new THREE.Mesh(basinGeo, basinMat);
  harvestGroup.add(basin);

  // Fermenting mash liquid
  const mashGeo = new THREE.CircleGeometry(3.3, 16);
  mashGeo.rotateX(-Math.PI / 2);
  const mashMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.2, metalness: 0.3 });
  const mash = new THREE.Mesh(mashGeo, mashMat);
  mash.position.y = 0.55;
  harvestGroup.add(mash);

  group.add(harvestGroup);

  hotspots.push({
    id: 'harvest-commons',
    name: 'Harvest & Fermentation Commons',
    position: new THREE.Vector3(15, 2.0, 45),
    district: 'Harvest Commons (D)',
    category: 'Biochemistry & Culture',
    shortDesc: 'Managed basins where Cretaceous angiosperm fruits ferment under wild yeast cultures.',
    lore: 'The biological catalyst for civilization. Fermentation created the social gatherings that lowered predatory aggression and opened perception to Alchul.',
    actionPrompt: 'Sample enzymatic fermentation mash'
  });

  // 7. Clean Draft Fire Grounds (District E)
  const fireGroup = new THREE.Group();
  fireGroup.position.set(45, 3.2, 35);

  const hearthGeo = new THREE.CylinderGeometry(2.5, 3.2, 1.5, 10);
  const hearthMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
  const hearth = new THREE.Mesh(hearthGeo, hearthMat);
  fireGroup.add(hearth);

  // Glowing coals
  const coalsGeo = new THREE.DodecahedronGeometry(1.8, 1);
  const coalsMat = new THREE.MeshStandardMaterial({
    color: 0xea580c,
    emissive: 0xff4500,
    emissiveIntensity: 1.2,
    roughness: 0.5,
  });
  const coals = new THREE.Mesh(coalsGeo, coalsMat);
  coals.position.y = 0.7;
  fireGroup.add(coals);

  const fireLight = new THREE.PointLight(0xf97316, 2.5, 18);
  fireLight.position.y = 1.5;
  fireGroup.add(fireLight);

  animatables.push({
    update: (_, elapsed) => {
      fireLight.intensity = 2.2 + Math.sin(elapsed * 12) * 0.4 + Math.cos(elapsed * 7) * 0.3;
      coals.rotation.y = elapsed * 0.1;
    }
  });

  group.add(fireGroup);

  hotspots.push({
    id: 'fire-ground',
    name: 'Clean Draft Combustion Flues',
    position: new THREE.Vector3(45, 3.8, 35),
    district: 'Fire & Transformation Ground (E)',
    category: 'Pyrotechnology',
    shortDesc: 'Subterranean draft ducts creating smokeless, high-efficiency charcoal heat.',
    lore: 'Developed without iron blast furnaces. Geometric draft tunnels pull river breezes through coals for curing skins, baking clay, and drying mineral pigments.',
    actionPrompt: 'Inspect aerodynamic draft flues'
  });

  // 8. Controlled-Contact Enclosure (District H - Alchul Interface)
  const contactGroup = new THREE.Group();
  contactGroup.position.set(70, 5.0, 10);

  // Monolithic acoustic stone circle
  for (let p = 0; p < 8; p++) {
    const angle = (p / 8) * Math.PI * 2;
    const pillarGeo = new THREE.BoxGeometry(0.8, 4.5, 1.4);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.7 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(Math.cos(angle) * 7, 2, Math.sin(angle) * 7);
    pillar.rotation.y = -angle;
    contactGroup.add(pillar);
  }

  // Central Alchul boundary resonance node
  const alchulCoreGeo = new THREE.OctahedronGeometry(1.2, 0);
  const alchulCoreMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0x9333ea,
    emissiveIntensity: 1.5,
    roughness: 0.1,
    metalness: 0.9,
    wireframe: true,
  });
  const alchulCore = new THREE.Mesh(alchulCoreGeo, alchulCoreMat);
  alchulCore.position.y = 2.2;
  contactGroup.add(alchulCore);

  const alchulLight = new THREE.PointLight(0xa855f7, 2.0, 20);
  alchulLight.position.y = 2.2;
  contactGroup.add(alchulLight);

  animatables.push({
    update: (_, elapsed) => {
      alchulCore.rotation.x = elapsed * 0.5;
      alchulCore.rotation.y = elapsed * 0.8;
      alchulLight.intensity = 1.8 + Math.sin(elapsed * 3) * 0.5;
    }
  });

  group.add(contactGroup);

  hotspots.push({
    id: 'contact-enclosure',
    name: 'Alchul Boundary Interface Node',
    position: new THREE.Vector3(70, 5.5, 10),
    district: 'Controlled-Contact Enclosure (H)',
    category: 'Non-Local Perception',
    shortDesc: 'Acoustically isolated stone perimeter where observers test localized temporal perception.',
    lore: 'Here, observers in Harvest-altered states first verified convergent glimpses of the coming planetary impact and began preparing the Long Descent.',
    actionPrompt: 'Attune to localized temporal displacement'
  });

  // 9. Cretaceous Flora: Metasequoia conifers and giant ferns
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1e3a1e, roughness: 0.7, flatShading: true });

  for (let t = 0; t < 35; t++) {
    const tx = -80 + (t * 23) % 180;
    const tz = -90 + (t * 31) % 180;

    // Skip if in the river
    if (Math.abs(tx + 20) < 15) continue;

    const tree = new THREE.Group();
    tree.position.set(tx, 0, tz);

    const trunkHeight = 10 + (t % 5) * 3;
    const trunkGeo = new THREE.CylinderGeometry(0.4, 0.8, trunkHeight, 6);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    tree.add(trunk);

    // Conifer foliage tiers
    for (let c = 0; c < 3; c++) {
      const coneGeo = new THREE.ConeGeometry(4.5 - c * 0.9, 5, 6);
      const foliage = new THREE.Mesh(coneGeo, foliageMat);
      foliage.position.y = trunkHeight * 0.6 + c * 3;
      foliage.castShadow = true;
      tree.add(foliage);
    }

    group.add(tree);
  }

  return {
    sceneObjects: group,
    waterMeshes,
    animatables,
    hotspots,
    spawnPoint: new THREE.Vector3(0, 1.2, 5),
    fogColor: new THREE.Color(0xd6d3d1),
    fogDensity: 0.008,
    skyColor: 0xbae6fd,
    groundColor: 0x3d352a,
  };
}

export function buildDeepEarthEnvironment(): EnvironmentBuildResult {
  const group = new THREE.Group();
  const waterMeshes: THREE.Mesh[] = [];
  const animatables: { update: (delta: number, elapsed: number) => void }[] = [];
  const hotspots: WorldHotspot[] = [];

  // Cavern Vault Enclosure (Inverted hollow sphere/cylinder for massive deep rift)
  const caveGeo = new THREE.CylinderGeometry(130, 110, 80, 24, 8, true);
  caveGeo.scale(-1, 1, 1);
  const caveMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.95,
    metalness: 0.2,
    flatShading: true,
  });
  const cave = new THREE.Mesh(caveGeo, caveMat);
  cave.position.y = 35;
  group.add(cave);

  // Cavern Floor with tectonic rift fractures
  const floorGeo = new THREE.PlaneGeometry(240, 240, 48, 48);
  floorGeo.rotateX(-Math.PI / 2);
  const pos = floorGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Rift fault fissure
    const riftDist = Math.abs(x);
    let y = (Math.sin(x * 0.05) + Math.cos(z * 0.05)) * 2;
    if (riftDist < 8) {
      y = -4 - (8 - riftDist) * 0.5;
    }
    pos.setY(i, y);
  }
  floorGeo.computeVertexNormals();

  const floorMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.receiveShadow = true;
  group.add(floorMesh);

  // Subterranean Hydrothermal Fissure Liquid
  const riftWaterGeo = new THREE.PlaneGeometry(16, 220);
  riftWaterGeo.rotateX(-Math.PI / 2);
  const riftWaterMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8,
  });
  const riftWater = new THREE.Mesh(riftWaterGeo, riftWaterMat);
  riftWater.position.set(0, -3.2, 0);
  group.add(riftWater);
  waterMeshes.push(riftWater);

  // Giant Bioluminescent Fungal Forest
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
  const capMat1 = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 1.2,
    roughness: 0.3,
  });
  const capMat2 = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 1.4,
    roughness: 0.2,
  });

  for (let f = 0; f < 30; f++) {
    const fx = -90 + (f * 29) % 180;
    const fz = -90 + (f * 43) % 180;
    if (Math.abs(fx) < 12) continue; // Keep rift path clear

    const mushroom = new THREE.Group();
    mushroom.position.set(fx, 0, fz);

    const height = 4 + (f % 5) * 2.5;
    const stemGeo = new THREE.CylinderGeometry(0.3, 0.7, height, 8);
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = height / 2;
    mushroom.add(stem);

    // Luminous umbrella cap
    const capGeo = new THREE.SphereGeometry(2.5 + (f % 3) * 0.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2.2);
    const cap = new THREE.Mesh(capGeo, f % 2 === 0 ? capMat1 : capMat2);
    cap.position.y = height;
    mushroom.add(cap);

    // Glowing point light from mushroom
    const light = new THREE.PointLight(f % 2 === 0 ? 0x10b981 : 0x06b6d4, 1.2, 18);
    light.position.y = height;
    mushroom.add(light);

    group.add(mushroom);
  }

  // Giant Resonant Calcite / Quartz Crystals
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xd8b4fe,
    emissive: 0x9333ea,
    emissiveIntensity: 0.8,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85,
  });

  for (let c = 0; c < 16; c++) {
    const cx = -60 + (c * 37) % 120;
    const cz = -70 + (c * 23) % 140;
    const crystalGeo = new THREE.ConeGeometry(1.2, 8 + (c % 4) * 2, 6);
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.set(cx, 3, cz);
    crystal.rotation.x = ((c % 3) - 1) * 0.2;
    crystal.rotation.z = ((c % 4) - 2) * 0.15;
    group.add(crystal);
  }

  // Type 1.7 Non-Local Displacement Hub (Central Deep Earth Portal)
  const portalGroup = new THREE.Group();
  portalGroup.position.set(30, 2, 0);

  const ringGeo = new THREE.TorusGeometry(5, 0.4, 8, 24);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0xc084fc,
    emissiveIntensity: 2.0,
    metalness: 0.95,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.y = 5.5;
  portalGroup.add(ring);

  const portalCoreGeo = new THREE.IcosahedronGeometry(2.5, 1);
  const portalCoreMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
  });
  const portalCore = new THREE.Mesh(portalCoreGeo, portalCoreMat);
  portalCore.position.y = 5.5;
  portalGroup.add(portalCore);

  const portalLight = new THREE.PointLight(0xa855f7, 3.5, 30);
  portalLight.position.y = 5.5;
  portalGroup.add(portalLight);

  animatables.push({
    update: (_, elapsed) => {
      ring.rotation.z = elapsed * 0.4;
      portalCore.rotation.x = elapsed * 0.7;
      portalCore.rotation.y = elapsed * 0.9;
    }
  });

  group.add(portalGroup);

  hotspots.push({
    id: 'displacement-hub',
    name: 'Type 1.7 Non-Local Displacement Hub',
    position: new THREE.Vector3(30, 3, 0),
    district: 'New Madrid Central Rift (Deep Lithosphere)',
    category: 'Matter-Boundary Physics',
    shortDesc: 'A mature topological displacement terminal bridging deep planetary chambers and off-world vessels.',
    lore: 'Over 66 million years, perceptual anomalies evolved into engineering. Rock vessels travel by establishing non-local correspondence rather than simple rocket acceleration.',
    actionPrompt: 'Engage displacement resonance calibration'
  });

  hotspots.push({
    id: 'fungal-forest',
    name: 'Engineered Bioluminescent Fungal Biosphere',
    position: new THREE.Vector3(-30, 2, 20),
    district: 'Subterranean Cultivation Biome',
    category: 'Chemosynthetic Ecology',
    shortDesc: 'Vast luminous mycological networks providing continuous light, carbohydrates, and oxygen cycling.',
    lore: 'The luminous deep world is not a natural cave; it was cultivated across millions of years by descendants transforming hostile rock into a self-sustaining underground cosmos.',
    actionPrompt: 'Analyze fungal luminescence frequencies'
  });

  return {
    sceneObjects: group,
    waterMeshes,
    animatables,
    hotspots,
    spawnPoint: new THREE.Vector3(0, 1.2, 10),
    fogColor: new THREE.Color(0x09090b),
    fogDensity: 0.015,
    skyColor: 0x09090b,
    groundColor: 0x18181b,
  };
}

export interface AnatomicalFeature {
  name: string;
  founderState: string;
  peakSurfaceState: string;
  deepWorldDescendantState: string;
  notes: string;
}

export interface EvolutionaryStage {
  id: string;
  name: string;
  era: string;
  classification: string;
  habitat: string;
  size: string;
  mass: string;
  posture: string;
  summary: string;
  keyFeatures: string[];
  visualConstraints: string[];
}

export const EVOLUTIONARY_STAGES: EvolutionaryStage[] = [
  {
    id: "founder",
    name: "Founder Population",
    era: "Late Cretaceous (~80–75 Ma)",
    classification: "Appalachian maniraptoran / dromaeosaur-grade theropod (unnamed taxon)",
    habitat: "Northern Mississippi Embayment coastal plain, cypress/conifer wetlands, river margins",
    size: "1.8 – 2.2 m total length, 0.8 m hip height",
    mass: "22 – 30 kg",
    posture: "Horizontal theropod balance with long counterbalancing tail and digitigrade legs",
    summary: "A small-to-medium feathered predatory dinosaur. Highly alert, fast-moving, with binocular vision, grasping three-fingered hands, and facultative sociality centered on hunting and seasonal fermentation sites.",
    keyFeatures: [
      "Toothed narrow snout with large forward-facing orbits",
      "True pennaceous feathers on forelimbs and tail; dense plumulaceous body mantle",
      "Three functional grasping digits with sharp recurved claws and semilunate carpal mobility",
      "Digitigrade stance with enlarged, hyperextended sickle claw on second toe",
      "External egg laying in mounded or partially buried vegetative nests with brooding attendance",
      "Mesopredator ecology: hunting smaller vertebrates, fish, invertebrates, eggs, and opportunistically gathering fermented fruit"
    ],
    visualConstraints: [
      "MUST depict: toothed snout, fully feathered torso, long stiffened tail, digitigrade legs, second-toe sickle claw, horizontal spine angle",
      "MUST NOT depict: modern bird beaks, human hands, clothing, generic lizard scales across the entire body, or human torso posture"
    ]
  },
  {
    id: "peak-surface",
    name: "Peak Surface Form (Pre-Descent)",
    era: "Late Cretaceous (~66.5–66.1 Ma)",
    classification: "Cultured maniraptoran descendant (Sen / Eru lineage)",
    habitat: "Engineered river terrace settlements (e.g. The Braided Reach), transition cave entries",
    size: "2.0 – 2.4 m total length, 1.1 m hip height",
    mass: "35 – 48 kg",
    posture: "Flexible bipedal theropod balance; capable of elevated upright survey and low stalking crawl",
    summary: "The mature surface civilization form. Possesses embodied geological stress sensing, clean draft fire manipulation, complex multimodal signaling (vocal, feather-flare, chemical), and 75% internal embryonic egg retention.",
    keyFeatures: [
      "Expanded neurocranium with enlarged vestibular and temporal association zones",
      "Specialized sensory filaments along neck, jaw, and forearms sensitive to air currents and river micro-pressure",
      "Hyper-dexterous three-fingered hands capable of tool alignment, fire control, and stave manipulation",
      "Prolonged internal egg retention: embryos develop internally through ~75% of development before laying hard shell",
      "Acoustic resonant chambers and infrasound reception through lower jaw and foot pads",
      "Facial keratin and subtle scute patterns around eyes; erectile feather displays for rich visual lexicon"
    ],
    visualConstraints: [
      "MUST depict: non-human proportions, theropod skull and dental line, sensory barbs, feathered mantle, functional gripping claws",
      "MUST NOT depict: humanized facial muscles, mammalian breasts, humanoid shoulders, or decorative clothing"
    ]
  },
  {
    id: "modern-descendant",
    name: "Subterranean Descendant (Modern / Type 1.7)",
    era: "Present Day (Post ~66 Ma Divergence)",
    classification: "Subterranean lithospheric sentient lineage (New Madrid / Reelfoot)",
    habitat: "Deep Earth fractures, Reelfoot Rift, non-local displacement nodes, off-world rock vessels",
    size: "1.6 – 2.1 m upright stature",
    mass: "40 – 60 kg (varies by caste/lineage)",
    posture: "Refined upright bipedal posture; reduced or vestigial tail; modified digitigrade/semi-digitigrade foot",
    summary: "After 66 million years of subterranean adaptation and intentional self-directed biological engineering, modern descendants represent an advanced post-dinosaurian morphology adapted to deep lithospheric and non-local environments.",
    keyFeatures: [
      "Shortened non-mammalian skull with refined jaw geometry and non-primate stereoscopic visual organs",
      "Modified integument: velvet-textured filaments, smooth dermal sheath, subtle crystalline keratin scutes",
      "Non-primate hands with 3–4 hyper-dexterous manipulative digits capable of nanometer-scale biochemical control",
      "Bioluminescent / field-responsive sensory crests and resonance organs",
      "Complete metabolic independence from surface solar cycles; chemosynthetic and non-local energy integration",
      "At a distance may suggest an upright bipedal figure, but close inspection reveals unambiguous non-mammalian dinosaurian ancestry"
    ],
    visualConstraints: [
      "MUST depict: terrestrial biological continuity, distinct non-human cranium and eye structure, non-primate hands",
      "MUST NOT depict: human with green scales, movie raptor in a spacesuit, generic grey alien, or mammal-like facial expressions"
    ]
  }
];

export const ANATOMICAL_COMPARISON: AnatomicalFeature[] = [
  {
    name: "Cranium & Vision",
    founderState: "Narrow elongated theropod skull, serrated teeth, large lateral/forward orbits, acute daylight binocular vision",
    peakSurfaceState: "Enlarged braincase, sensory sinuses, refined dentition for omnivorous/predatory processing, night-adapted tapetum",
    deepWorldDescendantState: "Shortened cranial vault, advanced non-mammalian visual organs sensitive to bioluminescence & field resonance",
    notes: "Never evolved modern bird beaks; retained modified teeth or specialized keratinous jaw ridges."
  },
  {
    name: "Forelimbs & Hands",
    founderState: "3 functional digits, curved raptorial claws, semilunate carpal enabling prey seizing, hooking, and bracing",
    peakSurfaceState: "Elevated tactile sensitivity, precision stave manipulation, draft chimney operation, delicate egg turning",
    deepWorldDescendantState: "Hyper-articulated non-primate manipulative digits, microscopic chemical sensitivity, field manipulation",
    notes: "Did not evolve a primate opposable thumb; manipulation evolved through specialized digital convergence and flexor control."
  },
  {
    name: "Reproduction & Incubation",
    founderState: "Iterative external laying of pairs of hard-shelled eggs in mounded nests; parental brooding and thermal attendance",
    peakSurfaceState: "Internal retention through ~75% of embryonic development; eggs laid for final 25% in climate-moderated chambers",
    deepWorldDescendantState: "Controlled directed embryogenesis; specialized physiological gestation chambers; genetic lineage curation",
    notes: "The 75% internal retention evolved on the surface as an evolutionary adaptation to secure clutches from floods and predators."
  },
  {
    name: "Integument & Plumage",
    founderState: "Full body pennaceous and down plumage; winged forelimbs and tail fan; scaled lower legs and foot pads",
    peakSurfaceState: "Tactile vibrissae-like filaments on jaw and arms; erectile mantle displays for syntax; insulated ventral pads",
    deepWorldDescendantState: "Fine tactile velvet filaments, resilient scute patterns, absence of broad flight feathers, bio-reactive luminescence",
    notes: "Plumage transitioned from aerodynamic and thermal insulation to sensory antennae and acoustic resonance surfaces."
  },
  {
    name: "Geological & Acoustic Sense",
    founderState: "Baseline terrestrial vibration detection; sensitive inner ear columella for low-frequency prey rustle",
    peakSurfaceState: "Embodied stress sensing: detects rock shear, hydraulic pressure wave fronts, gas pocket migration in fault zones",
    deepWorldDescendantState: "Direct neural integration with lithospheric seismic waves, fault harmonics, and non-local boundary fluctuations",
    notes: "Not psychokinesis: started as biomechanical sensitivity to where matter is already close to physical failure."
  },
  {
    name: "Sociality & Cognition",
    founderState: "Facultative social predator: solitary foraging with seasonal congregation around water, nests, and fermented fruit",
    peakSurfaceState: "Collective problem solving, specialist lineages (sensers, chemists, contact observers), generational memory",
    deepWorldDescendantState: "Harmonized collective consciousness protocols layered over individual autonomy; Type 1.7 scale",
    notes: "Never developed rigid human-style hierarchies, armies, or standardized industrial factories."
  }
];

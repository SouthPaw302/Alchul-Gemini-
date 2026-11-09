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
    era: "Late Cretaceous (~80–78 Ma onward; working range)",
    classification: "Appalachian maniraptoran / dromaeosaur-grade theropod (unnamed taxon)",
    habitat: "Northern Mississippi Embayment coastal-plain, wetland and river mosaics; precise flora varies by time",
    size: "Not numerically fixed",
    mass: "Not numerically fixed",
    posture: "Horizontal theropod balance with long counterbalancing tail and digitigrade legs",
    summary: "A small-to-medium feathered predatory dinosaur. Highly alert, fast-moving, with binocular vision, grasping three-fingered hands, and facultative sociality centered on hunting and seasonal fermentation sites.",
    keyFeatures: [
      "Toothed narrow snout with large forward-facing orbits",
      "True pennaceous feathers on forelimbs and tail; dense plumulaceous body mantle",
      "Three functional grasping digits with sharp recurved claws and semilunate carpal mobility",
      "Digitigrade stance with enlarged, hyperextended sickle claw on second toe",
      "External eggs and probable parental investment; exact nest, shell and clutch details remain under study",
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
    era: "Late Cretaceous mature surface period; precise interval open",
    classification: "Provisional evolved maniraptoran descendant; no fixed individual body model",
    habitat: "Engineered river terrace settlements (e.g. The Braided Reach), transition cave entries",
    size: "Unknown; 3D figure uses arbitrary units",
    mass: "Unknown; no validated mass model",
    posture: "Working hypothesis: theropod-derived balanced biped, with revised anatomy across long evolution",
    summary: "The mature surface civilization form. Possesses embodied geological stress sensing, clean draft fire manipulation, complex multimodal signaling (vocal, feather-flare, chemical), and 75% internal embryonic egg retention.",
    keyFeatures: [
      "Sophisticated sensory integration is canon; precise neurocranial shape and neural regions remain unverified",
      "Neck/jaw filaments are one speculative way of visualizing possible refined physical sensing",
      "A refined non-primate manipulative forelimb is plausible; precise digit joint range remains open",
      "Canon: about 75% of embryonic development is internal before final external incubation; shell mechanism unknown",
      "Advanced sensing of substrate and environmental change is canon; exact organs and frequency ranges unverified",
      "Feather-derived displays and keratin details are plausible design variants rather than approved anatomy"
    ],
    visualConstraints: [
      "MUST depict: nonhuman terrestrial evolutionary continuity, credible theropod-derived anatomical logic, non-primate manipulation, plausible functional posture",
      "MUST NOT depict: generic reptilian humanoid, human hands, humanized facial proportions, fixed founder anatomy unchanged across millions of years"
    ]
  },
  {
    id: "modern-descendant",
    name: "Subterranean Descendant (Modern / Type 1.7)",
    era: "Present day; multiple divergent lineages",
    classification: "Subterranean lithospheric sentient lineage (New Madrid / Reelfoot)",
    habitat: "Deep Earth fractures, Reelfoot Rift, non-local displacement nodes, off-world rock vessels",
    size: "Varies by lineage; not fixed",
    mass: "Varies by lineage; no confirmed caste system",
    posture: "Refined upright bipedal posture; reduced or vestigial tail; modified digitigrade/semi-digitigrade foot",
    summary: "After 66 million years of subterranean adaptation and intentional self-directed biological engineering, modern descendants represent an advanced post-dinosaurian morphology adapted to deep lithospheric and non-local environments.",
    keyFeatures: [
      "Shortened non-mammalian skull with refined jaw geometry and non-primate stereoscopic visual organs",
      "Modified integument: velvet-textured filaments, smooth dermal sheath, subtle crystalline keratin scutes",
      "Non-primate manipulative anatomy can vary among lineages; exact digit count and biological control scale are open",
      "External sensing structures and optional bio-light are design hypotheses, not universal modern traits",
      "Mature engineered habitats can be independent of surface resupply; exact lineage-level metabolism varies and is not determined",
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
    peakSurfaceState: "Cognitive and sensory sophistication is canon; braincase, sensory surfaces, dentition and night vision remain anatomically unresolved",
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
    peakSurfaceState: "Canon: internal retention through ~75% of embryonic development and final external incubation; site-specific nursery is provisional",
    deepWorldDescendantState: "Controlled directed embryogenesis; specialized physiological gestation chambers; genetic lineage curation",
    notes: "The ~75% internal-retention premise is canon by the peak surface stage; its developmental pathway and selective drivers remain to be reconstructed."
  },
  {
    name: "Integument & Plumage",
    founderState: "Full body pennaceous and down plumage; winged forelimbs and tail fan; scaled lower legs and foot pads",
    peakSurfaceState: "Possible feather/filament display and tactile specialization; exact sensory structures and signaling grammar remain open",
    deepWorldDescendantState: "Fine tactile velvet filaments, resilient scute patterns, absence of broad flight feathers, bio-reactive luminescence",
    notes: "Plumage transitioned from aerodynamic and thermal insulation to sensory antennae and acoustic resonance surfaces."
  },
  {
    name: "Geological & Acoustic Sense",
    founderState: "Baseline terrestrial vibration detection; sensitive inner ear columella for low-frequency prey rustle",
    peakSurfaceState: "Canon: unusually refined environmental sensing and physical tests of stress, pressure, fracture and water; exact receptor mechanisms unresolved",
    deepWorldDescendantState: "Direct neural integration with lithospheric seismic waves, fault harmonics, and non-local boundary fluctuations",
    notes: "Not psychokinesis: started as biomechanical sensitivity to where matter is already close to physical failure."
  },
  {
    name: "Sociality & Cognition",
    founderState: "Facultative social predator: solitary foraging with seasonal congregation around water, nests, and fermented fruit",
    peakSurfaceState: "Collective problem solving, specialist lineages (sensers, chemists, contact observers), generational memory",
    deepWorldDescendantState: "Some later direct/group-linked cognition is canon; no universal merged-mind protocol or political arrangement is fixed",
    notes: "Their technical/social history is not a copy of human development; particular forms of conflict and hierarchy are open."
  }
];

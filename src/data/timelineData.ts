export interface TimelinePhase {
  phase: number;
  id: string;
  title: string;
  timeframe: string;
  approxYearsAgo: string;
  location: string;
  summary: string;
  keyEvents: string[];
  cognitiveMilestone: string;
  environmentalState: string;
  civilizationLevel: string;
  quote?: string;
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    phase: 0,
    id: "founder-ecology",
    title: "Founder Ecology",
    timeframe: "Late Cretaceous (~80–78 Ma onward)",
    approxYearsAgo: "80,000,000 - 78,000,000 ya",
    location: "Northern Mississippi Embayment / Appalachian coastal plain",
    summary: "A small-to-medium Appalachian dromaeosaur-grade population occupies the northern Mississippi Embayment as a mesopredator across coastal-plain, riverine, wetland, and nearshore mosaics.",
    keyEvents: [
      "Mesopredator ecological niche established alongside hadrosaurs and tyrannosauroids",
      "Grasping three-fingered forelimbs used for prey handling and substrate manipulation",
      "High juvenile learning and observational memory through parental association",
      "Facultative sociality: solitary foraging with mate, kin, and feeding tolerance"
    ],
    cognitiveMilestone: "Predatory route memory, causal object investigation, and site fidelity",
    environmentalState: "Warm greenhouse climate, braided subtropical coastal rivers, cypress/conifer canopy",
    civilizationLevel: "Pre-cultural baseline animal population",
    quote: "They are hunters first. Their later culture never ceases to carry predatory cognition."
  },
  {
    phase: 1,
    id: "the-harvest",
    title: "The Harvest",
    timeframe: "Late Cretaceous (~78–75 Ma)",
    approxYearsAgo: "78,000,000 - 75,000,000 ya",
    location: "Seasonal inland river bends and flood margins",
    summary: "Naturally fermenting angiosperm plant material becomes a recurring ecological resource. Repeated gatherings alter social tolerance, learning, and mutual observation.",
    keyEvents: [
      "Fruiting plants and diversifying Cretaceous yeasts create naturally fermented caches",
      "Individuals return deliberately to high-yield fermentation sites each season",
      "Proximity forces reduction in intra-species aggression and increases juvenile exposure to adult behaviors",
      "Earliest behavioral traditions survive beyond individual lifespans"
    ],
    cognitiveMilestone: "Anticipatory seasonal congregation, shared behavioral routines",
    environmentalState: "Seasonal flood pulses leaving fermenting organic caches in shaded hollows",
    civilizationLevel: "Proto-cultural aggregations and seasonal behavioral traditions",
    quote: "Fermentation is not itself supernatural. Over deep time, the Harvest becomes chemistry, medicine, ritual, and science."
  },
  {
    phase: 2,
    id: "first-anomalous-perception",
    title: "First Anomalous Perception",
    timeframe: "Late Cretaceous (~75–73 Ma)",
    approxYearsAgo: "75,000,000 - 73,000,000 ya",
    location: "Specific geologically stressed sites along the ancient Reelfoot rift",
    summary: "A subset of Harvest participants experiences repeatable anomalies in altered states: fixation on empty spaces, impressions of places in different times, and patterns linked to Alchul.",
    keyEvents: [
      "Altered neurochemical states lower biological sensory filtering",
      "Glimpses of identical geographic locations in other temporal moments",
      "Persistent patterns, shared dream-impressions, and unexplained perceptual focus",
      "Emergence of the first sensitive individuals who notice Alchul's non-local presence"
    ],
    cognitiveMilestone: "Awareness of sensory boundaries; recognition that perception filters reality",
    environmentalState: "Active fault-zone outgassing and acoustic vibration along the rift",
    civilizationLevel: "Shamanic/perceptual specialists recognized within kin groups",
    quote: "Alchul initially influences through perception, dreams, repeated patterns, intuitions, and ideas rather than direct technological gifts."
  },
  {
    phase: 3,
    id: "cultural-persistence",
    title: "Cultural Persistence",
    timeframe: "Late Cretaceous (~73–70 Ma)",
    approxYearsAgo: "73,000,000 - 70,000,000 ya",
    location: "Terrace settlements along the Mississippi Embayment",
    summary: "Behavior reliably survives the discoverer. Ritual, acoustic calls, chemical marking, posture displays, and tool use create true cumulative cultural transmission.",
    keyEvents: [
      "Knowledge passes across multiple generations through active demonstration and rehearsal",
      "Development of complex tonal, feather-flare, and chemical signaling systems",
      "Intentional preservation of successful nesting hollows and resource banks",
      "Non-textual memory systems: mnemonic landscapes and shaped acoustic structures"
    ],
    cognitiveMilestone: "Cumulative culture: knowledge compounding across generations",
    environmentalState: "River meanders actively managed and stabilized by cultivated root systems",
    civilizationLevel: "Structured territorial societies with generational institutions",
    quote: "The population becomes culturally distinct before it becomes conventionally 'civilized'."
  },
  {
    phase: 4,
    id: "early-technical-civilization",
    title: "Early Technical Civilization",
    timeframe: "Late Cretaceous (~70–68 Ma)",
    approxYearsAgo: "70,000,000 - 68,000,000 ya",
    location: "Appalachian coastal terraces and river junctions",
    summary: "Clean draft fire, woven containers, organic preservation, mineral selection, and biochemical pharmacology develop without following a human metallurgy path.",
    keyEvents: [
      "Mastery of clean, low-smoke draft combustion without metal furnaces",
      "Chemical preservation of foods, skins, and medicinal resins",
      "Targeted hunting arrays, acoustic lures, and guided hydraulic traps",
      "Unified development of empirical science and sacred perceptual practice"
    ],
    cognitiveMilestone: "Systematized chemical and thermal manipulation of matter",
    environmentalState: "Managed river corridors with channeled overflow and thermal mass chambers",
    civilizationLevel: "Mature non-industrial technical culture",
    quote: "Surface technology increasingly works by cultivating or redirecting natural process: fire, fermentation, water, pressure, and living systems."
  },
  {
    phase: 5,
    id: "geological-sensing",
    title: "Geological Sense & Matter-Boundary Science",
    timeframe: "Late Cretaceous (~68–67 Ma)",
    approxYearsAgo: "68,000,000 - 67,000,000 ya",
    location: "Reelfoot rift faults and exposed carbonate highlands",
    summary: "Embodied sensory acuity allows specialists to detect acoustic resonance, microfractures, fluid pressure, and subterranean gas seams, working stone along its natural failure planes.",
    keyEvents: [
      "Evolutionary amplification of vibratory and infrasound reception in feet and cranial bones",
      "Exploitation of rock stress points using hydraulic pressure, thermal shock, and wedges",
      "Systematic mapping of fault systems, cavern networks, and groundwater chemistry",
      "Early repeatable studies of localized spatio-temporal boundary anomalies"
    ],
    cognitiveMilestone: "Embodied structural intuition: sensing stress fields directly",
    environmentalState: "Transition from surface terrace manipulation to subterranean exploration",
    civilizationLevel: "Specialized guild of stone-sensers, ritual chemists, and navigators",
    quote: "They do not overpower stone. They exploit weaknesses where matter is already under stress."
  },
  {
    phase: 6,
    id: "early-other-side-access",
    title: "Early Other-Side Access",
    timeframe: "Late Cretaceous (~67.2–66.8 Ma)",
    approxYearsAgo: "67,200,000 - 66,800,000 ya",
    location: "Subterranean contact chambers and rift faults",
    summary: "The civilization progresses from passive perception to repeatable contact and controlled physical boundary interaction with the 'other side'.",
    keyEvents: [
      "Controlled chambers designed to isolate observers from surface sensory noise",
      "Repeatable physical interactions across localized spatio-temporal boundaries",
      "Specialist lineages bridge medicine, navigation, ritual, and boundary physics",
      "Small-scale non-local displacements of physical matter confirmed"
    ],
    cognitiveMilestone: "Multi-observer cross-verification of non-local reality",
    environmentalState: "Deep limestone cavities and rift fissures retrofitted into research spaces",
    civilizationLevel: "Threshold boundary-physics civilization",
    quote: "They learn that ordinary biological senses are filters rather than complete representations of reality."
  },
  {
    phase: 7,
    id: "knowledge-of-coming-end",
    title: "Knowledge of the Coming End",
    timeframe: "Late Cretaceous (~66.8–66.5 Ma)",
    approxYearsAgo: "66,800,000 - 66,500,000 ya",
    location: "Global observation networks across North America",
    summary: "Repeated temporal glimpses reveal sky-fire, extreme flash, perpetual darkness, global freezing, and mass starvation. The impending Chicxulub catastrophe is verified.",
    keyEvents: [
      "Independent observers across different sites record converging visions of planetary disaster",
      "Generational debates resolve: the coming collapse is real and non-negotiable",
      "Strategic rejection of surface bunkers in favor of deep planetary integration",
      "Systematic transfer of flora, fauna, seeds, fungal cultures, and archives below"
    ],
    cognitiveMilestone: "Anticipatory deep-time civilizational planning across millenia",
    environmentalState: "Surface world appears lush and oblivious; dinosaurs thrive while doom approaches",
    civilizationLevel: "Coordinated planetary triage culture",
    quote: "They do not abandon the surface because it already looks dead. They abandon it while it is still visibly alive."
  },
  {
    phase: 8,
    id: "preparation-before-descent",
    title: "Preparation Before Descent",
    timeframe: "Late Cretaceous (~66.5–66.1 Ma)",
    approxYearsAgo: "66,500,000 - 66,100,000 ya",
    location: "Subterranean networks connecting Reelfoot Rift to Appalachian karst",
    summary: "The subterranean realm is converted into a habitable living biosphere with cultivated bioluminescence, gas-routed heating, and stable fungal food webs.",
    keyEvents: [
      "Construction of self-renewing chemosynthetic and mycological agricultural webs",
      "Internal egg retention reaches 75% embryonic term, optimizing reproductive survival",
      "Surface installations engineered to degrade naturally into geology after evacuation",
      "Deep ancestral repositories established at New Madrid"
    ],
    cognitiveMilestone: "Ecological geoengineering: crafting synthetic biospheres in deep stone",
    environmentalState: "Massive underground cavities lit by engineered luminous fungi and mineral reflection",
    civilizationLevel: "Dual-tier civilization (surface terrace + deep earth)",
    quote: "The deep Earth is a destination and survival project, not the origin of civilization."
  },
  {
    phase: 9,
    id: "the-long-descent",
    title: "The Long Descent",
    timeframe: "Late Cretaceous (~66.1–66.0 Ma)",
    approxYearsAgo: "66,100,000 - 66,040,000 ya",
    location: "Subsurface New Madrid rift passages and deep karst conduits",
    summary: "Generational migration underground. Surface populations seal access routes, leaving surface installations to be reclaimed by rivers and mud.",
    keyEvents: [
      "Final migration waves descend through reinforced fault corridors",
      "Transitional settlements at intermediate depths stabilize climate and air circulation",
      "First generations born entirely below ground, knowing the surface only through archives",
      "Surface outposts maintain monitoring until the final impact season"
    ],
    cognitiveMilestone: "Severing of celestial sensory dependence; complete subterranean spatial adaptation",
    environmentalState: "Sealed subterranean caverns, autonomous air loops, chemo-luminescence",
    civilizationLevel: "Fully subterranean planetary civilization",
    quote: "The inhabitants alter light, airflow, water, heat, gas, microbial communities, and architecture."
  },
  {
    phase: 10,
    id: "k-pg-catastrophe",
    title: "The K–Pg Catastrophe",
    timeframe: "66.04 Ma",
    approxYearsAgo: "66,038,000 ya",
    location: "Global surface annihilation; subterranean New Madrid sanctuary",
    summary: "Chicxulub asteroid impacts the Yucatán carbonate platform. Shockwaves, firestorms, megatsunamis, and nuclear winter sterilize the surface. The deep civilization survives.",
    keyEvents: [
      "Impact megaseisms test deep structural engineering along the Reelfoot Rift",
      "Surface forests incinerate; global soot blocks sunlight for years; non-avian dinosaurs perish",
      "Underground life systems, insulated from solar energy, maintain thermal and biochemical stability",
      "The surface era ends forever; deep world becomes the sole continuity of dinosaurian civilization"
    ],
    cognitiveMilestone: "Validation of boundary science and multi-millennial survival architecture",
    environmentalState: "Surface: freezing darkness, acid rain, collapsed food chains. Subsurface: steady bioluminescent life",
    civilizationLevel: "Post-surface planetary survival society",
    quote: "The surface world collapses. The civilization survives below. The surface phase ends."
  },
  {
    phase: 11,
    id: "deep-world-consolidation",
    title: "Deep-World Consolidation",
    timeframe: "Paleocene to Eocene (~66–50 Ma)",
    approxYearsAgo: "66,000,000 - 50,000,000 ya",
    location: "Continental subterranean lithospheric fractures",
    summary: "Isolated underground clusters unite into continental networks. Cavities are transformed from emergency bunkers into a vast, luminous, living underground ecology.",
    keyEvents: [
      "Deep continental transit lines established along tectonic sutures",
      "Bioluminescent vegetation and fungal microclimates reach complete ecological equilibrium",
      "Development of biological air processors, water mineralization rings, and geothermal taps",
      "Archaeological preservation of founder history and ancestral surface artifacts"
    ],
    cognitiveMilestone: "Subterranean planetary ecological stewardship",
    environmentalState: "Luminous cavern ecosystems spanning hundreds of cubic kilometers",
    civilizationLevel: "Integrated continental subterranean commonwealth",
    quote: "The famous luminous deep world is therefore partly natural and partly the result of millions of years of cultivation and engineering."
  },
  {
    phase: 12,
    id: "biological-divergence",
    title: "Divergence & Directed Evolution",
    timeframe: "Eocene to Miocene (~50–15 Ma)",
    approxYearsAgo: "50,000,000 - 15,000,000 ya",
    location: "Planetary crust and deep rift complexes",
    summary: "Across tens of millions of years, subterranean adaptations and intentional genetic engineering alter body plans. Founders would no longer recognize their descendants by sight.",
    keyEvents: [
      "Development of directed biological engineering: tailoring tissue, senses, and lifespan",
      "Lineages diverge: specialized tactile thinkers, deep boundary navigators, physical manipulators",
      "Reduction or loss of tail in certain clades; emergence of hyper-dexterous non-primate hands",
      "Integument redesign: feather shafts replaced with sensory filaments, keratin plates, and adaptive skin"
    ],
    cognitiveMilestone: "Autonomic self-directed evolution: biology as deliberate design",
    environmentalState: "Ultra-deep habitats operating at lithostatic pressures and elevated temperatures",
    civilizationLevel: "Post-biological / bio-engineered advanced civilization",
    quote: "Do not freeze founder morphology. Present-day descendants reflect ~66 million years of evolution, divergence, and self-modification."
  },
  {
    phase: 13,
    id: "mature-non-local-technology",
    title: "Mature Non-Local Technology",
    timeframe: "Miocene to Pliocene (~15–5 Ma)",
    approxYearsAgo: "15,000,000 - 5,000,000 ya",
    location: "Planetary interior and extra-dimensional boundaries",
    summary: "The ancient perceptual anomalies linked to Alchul are engineered into non-local displacement technology: moving matter without traversing intervening physical space.",
    keyEvents: [
      "Transition: localized perception → boundary interaction → physical displacement → living ecosystem transport",
      "Elimination of brute-force mechanical locomotion for long-distance transit",
      "Machines constructed as living ecosystems rather than assembled metal components",
      "Distributed collective consciousness protocols linking distant nodes"
    ],
    cognitiveMilestone: "Mastery of non-local topology and displacement physics",
    environmentalState: "Tectonic faults turned into resonant physical conduits and energy taps",
    civilizationLevel: "Advanced boundary-displacement civilization",
    quote: "The vessel is not merely a hull. It is a place capable of becoming somewhere else."
  },
  {
    phase: 14,
    id: "planetary-civilization",
    title: "Planetary Subsurface Civilization",
    timeframe: "Pliocene to Early Pleistocene (~5–2 Ma)",
    approxYearsAgo: "5,000,000 - 2,000,000 ya",
    location: "Global lithosphere; New Madrid remains the ancestral heart",
    summary: "Deep settlements span the globe. Earth's tectonic faults, hydrothermal systems, and deep crustal fluids function as the metabolic circulatory system of civilization.",
    keyEvents: [
      "Planetary-scale geological stabilization of critical rift zones",
      "New Madrid remains revered as the sacred biological cradle and primary hub",
      "Humanity's hominid ancestors emerge on the surface; observed passively",
      "Surface monitoring arrays disguised as ordinary rock formations and geological strata"
    ],
    cognitiveMilestone: "Planetary-scale consciousness and symbiotic geology",
    environmentalState: "Stable crustal homeostasis; surface experiencing ice ages",
    civilizationLevel: "Type ~1.5 Planetary Civilization",
    quote: "Its surface signatures resemble ordinary geology because its systems are integrated with the planet rather than placed on top of it."
  },
  {
    phase: 15,
    id: "expansion-beyond-earth",
    title: "Expansion Beyond Earth",
    timeframe: "Pleistocene (~2,000,000–300,000 ya)",
    approxYearsAgo: "2,000,000 - 300,000 ya",
    location: "Lunar subsurface, asteroids, inner planetary lithospheres",
    summary: "Rock-like vessels carry complete, portable ecosystems into the solar system. Subterranean environments of the Moon, Mars, and asteroids become colonized.",
    keyEvents: [
      "Asteroid and planetary interior exploration using rock-vessels and displacement",
      "Establishment of off-world subterranean biospheres requiring no solar light",
      "Transport bypasses relativistic rocket travel via topological correspondence",
      "Earth remains the irreplaceable phylogenetic and cultural seed-world"
    ],
    cognitiveMilestone: "Interplanetary ecological dispersion without artificial hulls",
    environmentalState: "Sub-surface biospheres established across solar system bodies",
    civilizationLevel: "Interplanetary Type ~1.6 Civilization",
    quote: "Rock-like vessels carry portable ecological systems into space. Asteroids, moons, and planetary interiors become natural destinations."
  },
  {
    phase: 16,
    id: "human-emergence",
    title: "Human Emergence & Distorted Contact",
    timeframe: "Late Pleistocene to Holocene (~300,000–100 ya)",
    approxYearsAgo: "300,000 - 100 ya",
    location: "Global surface; Mississippi Valley & New Madrid region",
    summary: "Homo sapiens spreads across North America. Rare surface sightings and acoustic phenomena generate folklore: horned serpents, underworld gods, tremors, and luminous lights.",
    keyEvents: [
      "Indigenous peoples settle the Mississippi valley; subtle acoustic interactions recorded in oral tradition",
      "Strict non-interference policy; humans are recognized as an independent mammalian branch",
      "Convergence of form: upright posture and manipulation lead to distorted human mythologies",
      "1811–1812 New Madrid earthquakes: deep infrastructural adjustments shake North America"
    ],
    cognitiveMilestone: "Anthropological observation of secondary sapience emerging on Earth",
    environmentalState: "Holocene climate; intensive human surface modification",
    civilizationLevel: "Hidden Type ~1.7 Planetary Guardian",
    quote: "Humans are not their descendants, creations, or copies. Human mythology contains distorted traces of contact, but specific traditions remain culturally distinct."
  },
  {
    phase: 17,
    id: "present-day",
    title: "Present Day — The Active Deep",
    timeframe: "Modern Era (Present)",
    approxYearsAgo: "0 ya",
    location: "New Madrid Seismic Zone, Reelfoot Rift, Deep Earth",
    summary: "A Type ~1.7 civilization remains active miles beneath North America. Its presence is disguised within natural seismicity, fault mechanics, and crustal fluid flows.",
    keyEvents: [
      "Modern human seismic instruments register deep New Madrid anomalies, interpreted as enigmatic intraplate faulting",
      "Non-local displacement systems link Earth's core, subsurface nodes, and off-world habitats",
      "Alchul remains the unresolved, sacred ontological mystery at the center of their reality",
      "Canon authority locked: natural history reconstructed from geological and biological evidence"
    ],
    cognitiveMilestone: "Hyper-integrated cosmic ecology and unresolved metaphysical communion",
    environmentalState: "Anthropocene surface stress; deep biosphere pristine and flourishing",
    civilizationLevel: "Type ~1.7 Advanced Planetary Civilization",
    quote: "What humans measure as faulting, pressure, fluid movement, or unusual deep structure may sometimes be the surface expression of systems whose function humans do not recognize."
  }
];

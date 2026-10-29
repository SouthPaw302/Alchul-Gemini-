export type EvidenceStatus = "Established Science" | "Plausible Inference" | "In-Universe Canon";

export interface ResearchTopic {
  id: string;
  category: "Paleontology & Anatomy" | "Geology & Deep Earth" | "Botany & Fermentation" | "Cognition & Culture" | "Catastrophe & Survival";
  title: string;
  status: EvidenceStatus;
  summary: string;
  realWorldEvidence: string;
  speculativeExtrapolation: string;
  fossilOrGeologicalRefs: string[];
  canonicalApplication: string;
}

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "reelfoot-rift",
    category: "Geology & Deep Earth",
    title: "Reelfoot Rift & New Madrid Structural Weakness",
    status: "Established Science",
    summary: "The Reelfoot Rift is an ancient tectonic rift formed during the Neoproterozoic breakup of Rodinia (~550–500 Ma), underlying the modern central Mississippi Valley.",
    realWorldEvidence: "Deep seismic reflection, magnetic anomalies, and borehole data confirm a deep-seated graben system reactivated in the Mesozoic and currently active as the New Madrid Seismic Zone.",
    speculativeExtrapolation: "In the Alchul universe, this deep structural weakness serves as the physical conduit and ancestral anchoring corridor through which the civilization establishes its deepest installations.",
    fossilOrGeologicalRefs: ["Braile et al. (1982) Tectonophysics", "Van Arsdale (2009) GSA Special Papers", "USGS New Madrid Earthquake Catalog"],
    canonicalApplication: "Explains why the civilization's heartland is located at New Madrid and how modern earthquakes relate to deep lithospheric systems."
  },
  {
    id: "appalachian-founders",
    category: "Paleontology & Anatomy",
    title: "Appalachian Maniraptoran Founder Lineage",
    status: "Plausible Inference",
    summary: "During the Late Cretaceous, North America was divided by the Western Interior Seaway into Laramidia and Appalachia. Appalachian dinosaur fossils are rare and fragmented.",
    realWorldEvidence: "Appalachian fossils show distinct endemic theropod lineages (e.g. Dryptosaurus, Appelachesaurus, and isolated dromaeosaur teeth from the Ripley and Merchantville formations).",
    speculativeExtrapolation: "A small-to-medium dromaeosaur-grade mesopredator thrived in the coastal wetlands of the Mississippi Embayment. Its lack of formal naming in real paleontology reflects the sparse Appalachian fossil record.",
    fossilOrGeologicalRefs: ["Schwimmer et al. (1997) J. Paleontology", "Brownstein (2018) Royal Society Open Science", "Weishampel et al. (2004) Dinosaur Distribution"],
    canonicalApplication: "Provides realistic paleontological grounding for why no complete skeleton of the founder species has been formally described in modern textbooks."
  },
  {
    id: "theropod-hands",
    category: "Paleontology & Anatomy",
    title: "Three-Fingered Grasping Hands & Semilunate Carpal",
    status: "Established Science",
    summary: "Derived maniraptorans possessed a specialized half-moon shaped wrist bone (the semilunate carpal) enabling lateral flexion and folding of the hands.",
    realWorldEvidence: "Biomechanical studies of Deinonychus, Bambiraptor, and Velociraptor prove manual digits I, II, and III could converge to seize, brace, pin, and manipulate prey objects without true primate opposability.",
    speculativeExtrapolation: "The founders developed fine digital dexterity, using their three clawed digits to manipulate wood wedges, twist bark, rotate staves, and manage draft vents.",
    fossilOrGeologicalRefs: ["Gishlick (2001) Nature", "Senter (2006) J. Zoology", "Carpenter (2002) Gaia"],
    canonicalApplication: "Enforces strict visual and functional canon: no human hands or primate thumbs, yet authentic high-precision manual tool-crafting."
  },
  {
    id: "internal-egg-retention",
    category: "Paleontology & Anatomy",
    title: "75% Internal Embryonic Retention Before Oviposition",
    status: "In-Universe Canon",
    summary: "By the peak surface period, egg-bearing adults retain developing embryos internally for roughly three quarters of development before laying hard-shelled eggs.",
    realWorldEvidence: "Modern birds cannot retain eggs internally because shell calcification and maternal oxygen delivery create severe physiological constraints. However, certain squamates exhibit prolonged retention.",
    speculativeExtrapolation: "A specialized evolutionary adaptation in this maniraptoran clade altered oviduct vascularity, shell deposition timing, and embryonic gas exchange to protect clutches from wetland inundation.",
    fossilOrGeologicalRefs: ["Blackburn (1995) Herpetological Monographs", "Varricchio & Jackson (2016) Integrative and Comparative Biology"],
    canonicalApplication: "Directly shapes settlement architecture (nursery chambers, elevated walkways) and character dynamics (Eru's restrained gait during flood season)."
  },
  {
    id: "angiosperm-fermentation",
    category: "Botany & Fermentation",
    title: "Cretaceous Angiosperm Fruit & Yeast Diversification",
    status: "Established Science",
    summary: "The mid-to-Late Cretaceous witnessed the explosive radiation of flowering plants (angiosperms) producing fleshy fruits, seeds, and sugary nectar tissues.",
    realWorldEvidence: "Fossil floras from eastern North America (e.g. Raritan and Potomac formations) preserve diverse fleshy fruits. Molecular clock phylogenetics dates Saccharomyces yeast ethanol fermentation to the Cretaceous.",
    speculativeExtrapolation: "Naturally fermenting angiosperm fruit caches provided high-energy seasonal windfalls, drawing solitary predators together and triggering the social gatherings known as The Harvest.",
    fossilOrGeologicalRefs: ["Friis et al. (2011) Early Flowers and Angiosperms", "Thomson et al. (2005) Science", "Piškur et al. (2006) Trends in Genetics"],
    canonicalApplication: "Provides the biological catalyst for culture, chemistry, pharmacology, altered-state perception, and eventual contact with Alchul."
  },
  {
    id: "embodied-geology",
    category: "Cognition & Culture",
    title: "Embodied Infrasound & Geological Stress Sensing",
    status: "Plausible Inference",
    summary: "Animals such as elephants, alligators, and birds detect low-frequency seismic vibrations through specialized mechanoreceptors (Herbst corpuscles) in their feet and cranial bones.",
    realWorldEvidence: "Theropod cranial pneumaticity, large middle ear cavities, and dense foot pads provided strong physical foundations for picking up substrate acoustics and pressure tremors.",
    speculativeExtrapolation: "Through generations of selective refinement, specialist sensers learned to detect micro-fractures, trapped gas, and shear forces inside bedrock, exploiting stress points without heavy machinery.",
    fossilOrGeologicalRefs: ["O'Connell-Rodwell (2007) Bioacoustics", "Witmer & Ridgely (2009) Anatomical Record"],
    canonicalApplication: "Replaces standard sci-fi telekinesis with an embodied sensory science of rock fracture mechanics."
  },
  {
    id: "deep-biosphere",
    category: "Geology & Deep Earth",
    title: "Chemotrophic Subsurface Life Independent of Sunlight",
    status: "Established Science",
    summary: "The continental subsurface hosts a vast, active microbial biosphere extending several kilometers deep into fractured igneous and sedimentary rock.",
    realWorldEvidence: "Organisms like Desulforudis audaxviator derive all metabolic energy from radiolytic water splitting and hydrogen sulfide, living millions of years completely isolated from solar photosynthesis.",
    speculativeExtrapolation: "When the civilization descended prior to the K-Pg impact, they integrated into this existing deep chemosynthetic biosphere, cultivating bioluminescent fungi and subterranean food webs.",
    fossilOrGeologicalRefs: ["Chivian et al. (2008) Science", "Magnabosco et al. (2018) Nature Geoscience", "Borgonie et al. (2011) Nature"],
    canonicalApplication: "Explains how the civilization survived the global nuclear winter and collapse of surface photosynthesis following the Chicxulub asteroid impact."
  },
  {
    id: "alchul-mystery",
    category: "Catastrophe & Survival",
    title: "The Ontology & Perception of Alchul",
    status: "In-Universe Canon",
    summary: "Alchul is an unresolved reality outside ordinary biological sensory bandwidth that communicates via altered-state impressions, dreams, and localized temporal glimpses.",
    realWorldEvidence: "N/A — strict speculative science-fiction layer.",
    speculativeExtrapolation: "Alchul is not a deity, machine, or demon. It leaves its true nature open, serving as the enigmatic catalyst that prompts the civilization to prepare for and survive the K-Pg boundary.",
    fossilOrGeologicalRefs: ["ALCHUL.md Canon Standard"],
    canonicalApplication: "Governed by the strict authorial rule: Alchul must never be demystified into a generic alien or magic god."
  }
];

export interface SettlementDistrict {
  id: string;
  name: string;
  letter: string;
  color: string;
  position: { x: number; y: number; width: number; height: number };
  elevation: string;
  functionSummary: string;
  architecturalDetails: string[];
  sensoryProfile: string;
  inhabitants: string;
  canonSource: string;
}

export interface SettlementMeta {
  name: string;
  region: string;
  era: string;
  riverType: string;
  climate: string;
  status: string;
  description: string;
}

export const BRAIDED_REACH_META: SettlementMeta = {
  name: "The Braided Reach",
  region: "Northern Mississippi Embayment / Appalachian coastal plain (Ancestral New Madrid)",
  era: "Mature Peak Surface Period (~Late Cretaceous, Pre-Descent)",
  riverType: "Braided and anastomosing subtropical coastal river system",
  climate: "Warm-temperate to subtropical greenhouse; high seasonal precipitation",
  status: "Working settlement reconstruction (Model of mature surface culture)",
  description: "Not a stone metropolis, but an engineered stretch of wooded high bank bordered by shifting braided channels and floodplain. From a distance it resembles a natural wetland landscape; up close, every contour reflects deliberate cultivation: braced banks, managed currents, draft fire chambers, protected nurseries, and acoustic corridors."
};

export const SETTLEMENT_DISTRICTS: SettlementDistrict[] = [
  {
    id: "upstream-sensing",
    name: "Upstream Sensing Reach",
    letter: "A",
    color: "#0284c7", // sky blue
    position: { x: 10, y: 15, width: 25, height: 28 },
    elevation: "Low water level (0–1.5m above river bed)",
    functionSummary: "Early detection of floods, bank collapse, approaching megafauna, and upstream seismic tremors.",
    architecturalDetails: [
      "Submerged timber weirs and sediment baffles redirecting silt into stabilization zones",
      "Vibration-sensitive submerged staves driven into underlying bedrock to read pressure waves",
      "Inspection paths along living root margins allowing watchers like Sen to taste mud chemistry and detect grain size changes",
      "Sediment drop-traps that reveal clay vs quartz sand ratios to predict upstream river bank failure"
    ],
    sensoryProfile: "Cold river water, shifting mineral silt, hollow acoustic vibrations pulsing through submerged wood",
    inhabitants: "Young scouts and sensory watchers (e.g., Sen), hydro-geological specialists",
    canonSource: "SETTLEMENT_01 § 3.A & CHRONICLE_01 § I"
  },
  {
    id: "living-banks",
    name: "Living Banks & Habitation",
    letter: "B",
    color: "#16a34a", // emerald green
    position: { x: 40, y: 15, width: 30, height: 35 },
    elevation: "Intermediate terrace (2.5–5.0m above base flow)",
    functionSummary: "Sheltered dwellings, sleeping hollows, communal walkways, and thermal insulation chambers.",
    architecturalDetails: [
      "Engineered earthen mounds reinforced with living conifer roots and fibrous clay binders",
      "Curved corridors proportioned for non-primate theropod posture, tail clearance, and digitigrade stride",
      "Raised timber walkways allowing egg-bearing adults to traverse without straining deep abdominal ligaments",
      "Thermal mass benches utilizing waste heat from lower draft channels to maintain night warmth"
    ],
    sensoryProfile: "Damp soil, sweet resin, warm wood smoke, soft rustling of down plumage",
    inhabitants: "Family associations, resting adults, crafting groups, visiting kin",
    canonSource: "SETTLEMENT_01 § 3.B & CHRONICLE_01 § I"
  },
  {
    id: "nursery-grounds",
    name: "Nursery & Incubation Grounds",
    letter: "C",
    color: "#e11d48", // rose red
    position: { x: 75, y: 15, width: 22, height: 35 },
    elevation: "Highest, most flood-secure terrace (6.0m elevation)",
    functionSummary: "Climate-moderated chambers for the final 25% external egg incubation and juvenile education.",
    architecturalDetails: [
      "Heavy thermal clay vaults maintaining constant 31–33°C temperature and 80% relative humidity",
      "Aerated sand-leaf bedding designed for delicate manual egg rotation and embryo acoustic conditioning",
      "Acoustic damping barriers preventing sudden shockwaves from startling developing embryos",
      "Curved observation runs where juveniles watch older artisans manipulate tools and mix compounds"
    ],
    sensoryProfile: "Warm humid peat, sterile pine resin, muted maternal low-frequency purrs",
    inhabitants: "Brooding adults (e.g., Eru), egg attendants, newly hatched juveniles",
    canonSource: "SETTLEMENT_01 § 3.C & CHRONICLE_01 § I"
  },
  {
    id: "harvest-commons",
    name: "Harvest & Fermentation Commons",
    letter: "D",
    color: "#d97706", // amber
    position: { x: 10, y: 50, width: 25, height: 35 },
    elevation: "Shaded terrace shelf with seasonal microclimate (3.0m elevation)",
    functionSummary: "Managed fermentation, biochemical processing, pharmacological distillation, and ritual food preparation.",
    architecturalDetails: [
      "Shaded earthen basins lined with impermeable river clay and aromatic antimicrobial wood",
      "Aeration screens regulating wild yeast cultures and fungal fermentation of sugary angiosperm fruits",
      "Drainage canals routing acidic runoff into neutralization gravels",
      "Vessel storage chambers for preserved vinegars, medicinal tinctures, and altered-state elixirs"
    ],
    sensoryProfile: "Pungent ethanol vapor, fruity esters, sharp herbal vinegar, bubbling mash",
    inhabitants: "Fermentation masters, medicine keepers, seasonal community gatherings",
    canonSource: "SETTLEMENT_01 § 3.D & CANON.md"
  },
  {
    id: "fire-grounds",
    name: "Fire & Transformation Grounds",
    letter: "E",
    color: "#ea580c", // orange
    position: { x: 40, y: 55, width: 28, height: 35 },
    elevation: "Downwind terrace margin (3.5m elevation)",
    functionSummary: "High-efficiency, low-smoke draft combustion, charcoal production, mineral drying, and hide curing.",
    architecturalDetails: [
      "Subterranean air draft flues pulling clean oxygen from river breezes into sunken burning hearths",
      "Aerodynamic earthen chimneys that route and condense particulate smoke before release",
      "Low-temperature ceramic curing pits and pigment roasting basins (limonite, ochre, hematite)",
      "Charcoal cooling chambers ensuring fuel for winter heating and water purification filters"
    ],
    sensoryProfile: "Dry radiant heat, glowing hardwood coals, calcined mineral dust, pungent curing smoke",
    inhabitants: "Thermal specialists, mineral preparers, hide tanners, tool builders",
    canonSource: "SETTLEMENT_01 § 3.E & CANON.md"
  },
  {
    id: "controlled-contact",
    name: "Controlled-Contact Enclosure",
    letter: "H",
    color: "#9333ea", // purple
    position: { x: 72, y: 55, width: 25, height: 35 },
    elevation: "Deep secluded hollow bounded by ancient limestone fault (4.5m elevation)",
    functionSummary: "Sanctuary for repeatable altered-state perception, observation of Alchul, and spatio-temporal boundary trials.",
    architecturalDetails: [
      "Acoustically tuned concave stone alcoves designed to suppress surface ambient noise",
      "Non-textual spatial record grids: tactile stone matrices where observers align stones to record temporal glimpses",
      "Controlled dosage dispensers for Harvest concentrates to elicit uniform altered perceptual states",
      "Comparison benches where multiple observers simultaneously record independent impressions of future catastrophes"
    ],
    sensoryProfile: "Profound silence, cool draughts from deep bedrock fissures, scent of dried aromatic moss",
    inhabitants: "Alchul-sensitive shamans, boundary researchers, navigators",
    canonSource: "SETTLEMENT_01 § 3.H & ALCHUL.md"
  }
];

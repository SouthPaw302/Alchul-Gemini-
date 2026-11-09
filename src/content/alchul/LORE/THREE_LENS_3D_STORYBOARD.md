# Three Lenses — 3D Worldview Storyboard and Simulator Integrity Rules

**Status:** illustrative design specification / nonbinding lore, 2026-11-09.
**Scope:** current Alchul console can teach anatomy, the resident's sensory field, and uncertainty of contact without pretending it depicts the being called Alchul. Companion lore: `LORE/EMBODIED_WORLDVIEW_ATLAS.md` and `LORE/BELIEF_HISTORY_ARCHETYPES.md`.

## Why “3D” requires more than a rotating model

A rotating character conveys surface anatomy but does not explain the character's *inhabited space*. A credible 3D study relates body proportions and movement to the architecture, atmospheric routes, danger signs, social signals, memories and contested accounts of anomalous perception.

Three **switchable editorial lenses** operate over the *same physical scene*. Changing the lens should not quietly change history.

### Lens A — Outside observer

**Purpose:** show uncertain biology and ecology, terrain geometry, material infrastructure and source status.

**Camera:** follow at body side and slightly above, rotate to observe posture and reach, view nest or nursery within circulation paths. Use readable scale references that are *not human-sized furniture*.

**Annotations:** visible water path, physical structure, food delivery direction, presumed air routes with explicit "hypothetical" tags. Body parts display whether founder-era constraints are locked or intermediate morphology provisional.

**Ethical rule:** no unquestioned inner thoughts via labels like “these people believe...”.

### Lens B — Resident / inhabited environment

**Purpose:** show what the same location *means for one historically situated individual*.

**Camera:** lower toward that particular body's head/upper-body orientation; not automatic human first-person camera. POV is explicitly an editorial approximation until species-specific eye positions, fields and visual acuity are reconstructed.

**Annotations:** air movement, thermal gradients, substrate-transmitted vibration, chemically informative pathways, social no-entry cues, caretaker signals, evacuation and body clearance. These are **translated sensory overlays**, not literal colored beams emitted by animals.

**Interactive example:** at the nursery, pressing an airflow marker brings up *my companion's developing eggs share this air, and the alternate path must remain passable*. A visitor sees the same chamber as a small protected rock shelf.

**Variation:** a water keeper, a juvenile and an egg-bearing parent prioritize different environmental information.

### Lens C — Contact testimony / unresolved experience

**Purpose:** portray **reports** associated with Alchul, not the actual nature or eyes of Alchul.

**Camera:** remain anchored to a known physical site. Momentarily superpose *reported* different conditions of the same place (flooded/dry, breathing/stagnant, remembered/unexpected). Use an explicit annotation: *“Account under dispute — no conclusion about Alchul's intention, viewpoint or form.”*

**Content:** show at least two interpretations of an event: skilled normal inference and anomalous contact. Do not turn alternative time images into guaranteed future-projection machinery at the early surface stage.

**Never:** a hovering purple polyhedron described as Alchul, deity face, direct dialogue from Alchul explaining the cosmos, a definitive gender, or 'Alchul's own POV'.

## Scene selection and era separation

| Scene | Era | Appropriate viewer content | What cannot be inferred |
| --- | --- | --- | --- |
| Returning Harvest ground | Earliest cultural development, chronology deliberately broad | Predator social tolerance, resource patterns, first uncertain reports | Sophisticated settled theology, full sapience in founders |
| Braided Reach-like surface site | Mature surface civilization; date not canonized | River and pressure sensing, nurseries, chemistry, specialists, multi-path records | Exact city plan, population, hard-coded incubation 32°C, fixed six-egg clutch |
| First Below / Spring Margin | Provisional ~70 Ma working setting | Flood line, clean-air path, independent vent checks, surface imports, nursery | Fully closed biosphere or confirmed geological cave |
| Later deep Earth | Post-K–Pg; relative era known | Cultivated light ecology, diverse descendants, networked infrastructure | Exactly the same creature morphology as peak era; ancient caves unmodified |
| Present New Madrid | Modern within universe | Living deep civilization with varied forms and geology-integrated infrastructure | All phenomena explained, one unified religion, humanoid reptile citizens |

The current console mixes Braided Reach and modern deep Earth as two broad illustrative scenes; label both as **prototypes**. It does not yet implement the complete five-scene sequence.

## Interactive display contract (minimum viable revision)

Implement a switch with three perspectives near the 3D world viewer:
1. **Outside** — a scientific-reconstruction annotation explaining what can be seen.
2. **Resident** — a resident-centered description of the same setting; environmental meaning takes priority.
3. **Contact reports** — only statements about reported anomalies and competing interpretations.

The selected text should adapt to *surface* vs *deep Earth*. It must remain visible and useful on mobile. The selector is an interpretive overlay; without sensory shader and POV camera work it must **not** claim to simulate dinosaur vision or Alchul's reality.

Add an explicit codex link to this documentation, and label prototype imagery as **illustrative / not canon**.

## Visual integrity corrections in the original scene

1. **Remove the visible floating “Alchul core”.** Keep a physically plausible controlled-observation apparatus if useful, but no object is Alchul. Early alleged contact is not an entity represented by a luminous geometric statue.
2. **Remove exact 32°C nursery assertion.** Internal egg retention of ~75% is canon, but neither 32°C nor the exact shell and incubation arrangement is established. Show monitored thermal conditions, not a numerical setpoint.
3. **Do not silently fix clutch size.** Any six rendered eggs in a prototype scene are scenery, not species biology. Prefer no model-specific numeric assertion until the reproductive work is complete.
4. **De-canonize model precision.** The existing polygonal 'peak-surface' avatar uses founder-like anatomical cues as a placeholder. It is not a scientifically ratified anatomy for a civilization tens of millions of years along its evolutionary path.
5. **Avoid collapsing surface ~75 Ma and K–Pg ~66 Ma into the same moment.** An impact-lighting preset is cinematic, not a simulation of an impact during the depicted settlement's lifetime.
6. **Modern rift environment must remain schematic.** Deep rift structures do not mean a geologically mapped open mega-cavern. Later engineered habitats can be enormous only as fictional achievements.
7. **Abstain from Alchul theology as interface decoration.** Violet glow may signify an editorial uncertainty layer only; never a physical aura proven to accompany Alchul.

## Longer-term 3D implementation steps

**Step 1 — Implemented in source (runtime unverified):** readable three-lens POV notes and lore links integrated with existing virtual viewer; Outside selects following camera, Resident selects an approximate body-height camera, and Contact reports selects a free observer camera. Unsupported fixed incubation detail and a literal glowing Alchul object were removed. These remain editorial approximations, not actual nonhuman sensorium.

**Step 2 — Body laboratory:** skeletal mass and locomotion studies for *founder vs peak working silhouette vs modern variant*, each with separate uncertainty legend and turn-around views. Fossil comparison anchors the founder; cultural evolution does not magically prescribe exact anatomy.

**Step 3 — Resident sensing:** synchronized overlay of physically modeled air paths, temperature, microbial cues, moving prey and vibration. Distinguish measured properties from speculative sensory transduction.

**Step 4 — Social scene:** at least three characters simultaneously, performing nonverbal negotiation, care and teaching. Show who can access a route, who moves under burden, and how signals travel between bodies.

**Step 5 — Chronicle interaction:** let viewers switch between independent testimony, ritual retelling, technical experiment and later historical reinterpretation of one event. The third-person narrator must never reveal the true identity or motives of Alchul.

**Step 6 — Historical transformation:** compare the same environmental challenge in surface culture, first below, post-K–Pg consolidation, and modern deep technology without implying exact modern cave continuity.

## Verification requirements

- Any 3D representation claims **which era** and **epistemic status** it depicts.
- Every exact biological measurement needs a canon/research citation; otherwise use relative description.
- 'Alchul's view' in UI means **contact testimonies**, never omniscient Alchul vision.
- Reproductive visualization must not invent settled egg count or physiological parameters.
- Access, water, air, food and safety systems must function causally in scene design.
- This document and code changes are not canon promotion.

This prototype should ultimately teach a visitor **how a resident navigates reality**, not merely how a model looks.

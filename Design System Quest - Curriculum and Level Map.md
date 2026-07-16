# Design System Quest — Curriculum & Level Map

*A spec for a gamified, AI-tutored learning app that takes a senior product designer from "never touched a design system" to "built, governed, and made one agent-readable." Last updated: July 2026.*

---

## 0. Design principles (read before building anything)

1. **The game is thin; the work is real.** The app provides the quest map, XP, streaks, quizzes, an AI tutor, and verification. Every boss fight produces an artifact in the actual industry stack — Figma, tokens.json, Style Dictionary, Storybook, GitHub, Claude Code. Nothing is simulated inside the app.
2. **Everything terminates in a portfolio artifact.** Each level deposits a piece into a `/portfolio` folder. The final boss assembles them into a mini design system + written case study. That artifact — not the XP — is what gets the job.
3. **Quests are sized for one sitting.** 30–90 minutes each. A visible "next action" always exists. Reading never blocks building for long: theory node → tiny drill → boss.
4. **Verification is real, not honor-system.** Wherever an artifact is code/JSON, the app checks it programmatically (schema validation, build success, token audits). Figma work uses checklists, visual tests, or Figma MCP.
5. **Depth over coverage.** This curriculum is opinionated and links out to living sources rather than re-hosting content. The AI layer changes monthly — Level 8's resource list is dated and should be refreshed each run.
6. **The tutor teaches from first principles.** Every concept gets a "why does this exist at all" framing before the "how." The tutor is Socratic and is *forbidden* from producing boss artifacts.

---

## 1. The game shell & Learning mechanics

### 1.1 Screens
- **Quest map** — linear path of 10 nodes (Prologue → Level 8 → Final Boss) plus optional side-quest branches.
- **Level page** — three tabs: **Learn** (theory + resources), **Practice** (drills + quiz), **Boss** (quest brief, submission, verification result). Note: For coding levels, the Practice tab embeds an interactive REPL so feedback loops are instant.
- **Profile** — XP, streak, rank, achievements, and the artifact vault.

### 1.2 Progression, XP economy & Achievements
| Action | XP |
|---|---|
| Finish a reading/watch | 10 |
| Pass a quiz (5 questions, ≥80%) | 15 |
| Complete a drill | 25 |
| Beat a boss | 150 (Levels 7–8: 300) |
| Daily streak multiplier | ×1.1, caps at ×2.0 |

**Achievements for Edge Cases:** Grant badges for catching complex edge cases (e.g., the "Contrast Champion" badge for spotting a #FFFFFF text on a #F3F4F6 background during a drill).

**Ranks:** Déjà-Vu Hunter → Token Smith → Variable Wrangler → Component Architect → Pipeline Engineer → Storybook Keeper → Docwright → Governor → Agent Whisperer → **System Architect**.

### 1.3 The AI tutor & Pair Programming
- Explains each concept from first principles with analogies, then quizzes adaptively.
- **Pair Programming Drills:** The tutor doesn't just answer questions; it acts as the "Driver" during specific drills. The tutor writes flawed code or tokens, and the user must act as the "Navigator/Reviewer" to spot the system violations.
- **Hard rule:** on boss screens the tutor answers questions and offers a 3-level hint ladder, but never writes the artifact. 

### 1.4 Verification engine (per quest type)
- **Token JSON:** Parses; checks DTCG structure; semantic tier contains no raw hex.
- **Builds:** Runs the build; checks output files via CI/CD.
- **Code:** Grep/AST audit: no raw hex/px outside generated files; Chromatic visual regression passes.
- **Figma:** Figma MCP server audits variables and component APIs directly.

---

## 2. The system you'll build (the through-line)

Pick a fictional product (a habit tracker, a recipe app). Across all levels, construct one coherent mini design system:

- **Tokens:** Accessible color matrix (APCA/WCAG math), Spacing, Typography (fluid scales), Shadows/Elevation, Motion (duration/easing) — primitive → semantic → component tiers in DTCG.
- **Modes:** Light/Dark, Density (Compact/Comfortable), Viewport Breakpoints.
- **Components:** Layout Primitives (Box, Stack), UI Components (Button, Input), and a Compound Component (Select/Accordion).
- **Pipeline:** Figma → Tokens Studio → GitHub Actions → Style Dictionary → CSS Variables.
- **Docs:** Storybook with interactive playgrounds and Chromatic visual regression.
- **Governance:** Contribution RFC, tracking detachment metrics, and one executed breaking change.
- **AI layer:** CLAUDE.md context constraints, Code Connect, Claude Code generation via Figma MCP.
- **Case study:** The capstone write-up tying it together.

---

## 3. The level map

---

### 🗺️ Level 0 — Prologue: Why Systems Exist
*Unlock condition: none. Rank: Déjà-Vu Hunter.*

**Theory (first principles)**
- **Why do systems exist?** A design system is **cached decisions**. Every recurring UI question ("which blue? how much padding?") answered once and reused. Decision math: *N* designers × *M* screens produce O(N·M) ad-hoc decisions; a system collapses that to O(N).
- **The System vs. The Product:** *Why do we draw a boundary?* Because a system that tries to do everything becomes an unmaintainable monolith. A system provides the primitives; the product provides the context. A system nobody adopts is a museum, not a product.
- The system is a **contract** between design and engineering.

**Resources**
- *Atomic Design*, Brad Frost — ch. 1–2 re-read with fresh eyes.
- "What is a Design System?" — Nathan Curtis

**Drills**
- Find 3 different "primary" buttons in one product you use daily. 

**🏆 Boss: The Interface Inventory**
Screenshot 8–10 screens of one product. Crop every button and input into a single Figma page. Write 150 words: what does this cost at 10× the screens and 5× the designers?

---

### 🪙 Level 1 — Tokens & The Math of Perception
*Rank: Token Smith.*

**Theory (first principles)**
- **Why do tokens exist?** **Indirection** is the whole trick. A token is a named decision. Components reference *purpose*, never *value*.
- **Why algorithms for color?** *Why not just pick what looks good?* Human color perception is non-linear. Accessibility must be baked into the primitive tier. You don't pick colors; you calculate accessible scales based on perceptual contrast (WCAG/APCA).
- **Why extract typography and space?** To prevent magic numbers. Fluid typography scales and shadow/elevation (mapping z-index to physics) are essential. *Composite tokens* bundle these into reusable styles.
- **Three tiers:** Primitive (what exists?), Semantic (what does it mean?), Component (where is it used?).
- **DTCG anatomy:** `$value`, `$type`, `{references}`.

**Resources**
- DTCG spec: https://www.designtokens.org
- Accessible Perceptual Contrast Algorithm (APCA) reading.

**Drills**
- Use contrast math to find the minimum passing hex for a given background. 

**🏆 Boss: Your First tokens.json**
Hand-write a DTCG-format `tokens.json`: An accessible color matrix, a typography scale (fontSize, lineHeight), and a spacing scale. Semantic tier (surface/text/action) must exist. No tooling — just a text editor or the app's REPL.
- *Verify:* JSON parses; references resolve; zero raw hex in semantic tier; contrast math checks pass.

---

### 🎛️ Level 2 — Figma Variables, Modes, & Space
*Rank: Variable Wrangler.*

**Theory (first principles)**
- **Why Modes?** Modes are **context multipliers**. They decouple the *meaning* (e.g., `color.surface.default`) from the *environment* (Light/Dark).
- **Why Density and Viewport Modes?** Because responsive design isn't just stretching boxes; it's changing the mathematical relationships of space.
- Figma variables are Figma-native tokens. Scoping controls where a variable may be applied.

**Resources**
- Figma variables & modes guides.

**Drills**
- Scope variables so fills/strokes only see color tokens, and paddings only see spacing tokens.

**🏆 Boss: The Responsive, Re-Theming Card**
Design a profile card bound to semantic variables. Add modes: Light/Dark AND a Density mode (Compact/Comfortable). 
- *Pass condition:* Toggling modes re-themes and resizes the entire card with zero manual edits.

---

### 🧱 Level 3 — Component & Layout Architecture
*Rank: Component Architect.*

**Theory (first principles)**
- **Why Layout Primitives?** **Composition over Configuration.** If you don't provide a `Stack` or `Box` component, designers will invent custom margins everywhere, defeating the system.
- A component is an **API**: variants and props are its signature.
- **Compound Components:** *Why separate parent and child?* Because boolean sprawl (`hasIcon`, `hasAvatar`, `hasBadge`) creates unmaintainable mega-components. Slot architectures (like Select/Dropdown or Accordions) are the solution.
- **States are first-class:** default, hover, focus, active, disabled.

**Resources**
- Shopify Polaris and GitHub Primer documentation.

**Drills**
- Draw the API signature (props/variants) of a complex Accordion component.

**🏆 Boss: The Primitives and The Compound**
Build a `Stack` layout primitive and a Compound Component (e.g., an Accordion) in Figma. Auto layout, slot architecture, every visual property bound to variables.
- *Pass condition:* Token audit passes; modifying the `Stack` adjusts the Accordion's internal spacing globally.

---

### 🔄 Level 4 — The Pipeline & Automation
*Rank: Pipeline Engineer.*

**Theory (first principles)**
- **Why automate?** **Drift is inevitable without enforcement.** Human discipline doesn't scale. If design tokens aren't treated like code pipelines, they will diverge.
- `tokens.json` is the product; everything else is a build artifact. 
- **Token CI/CD:** *Why CI/CD for design?* To bridge the gap between design and DevOps. A change in Figma should trigger a GitHub Action, which runs Style Dictionary and outputs CSS.

**Resources**
- Style Dictionary docs.

**Drills**
- Run the Style Dictionary basic example in the REPL; read the generated CSS.

**🏆 Boss: Token CI/CD Pipeline**
Wire Figma → Tokens Studio → GitHub. Set up a simple GitHub Action that triggers Style Dictionary to build CSS variables when the JSON changes. 
- *Pass condition:* A commit to the JSON file successfully generates `variables.css` in a `/dist` folder via CI/CD.

---

### 💻 Level 5 — Code, Storybook, & AI Scaffolding
*Rank: Storybook Keeper.*

**Theory (first principles)**
- **Why scaffold with AI?** AI is an accelerator, not a creator. A design system is highly patterned; patterned work is what AI is best at. We use agents here to generate the boilerplate React code from our JSON definitions.
- **Why Visual Regression?** Humans are fundamentally bad at spotting a 2px padding shift across 100 components during a code review. You cannot ship breaking changes confidently without automated eyes.
- The coded library is the *other projection* of the same system. Parity is the goal.

**Resources**
- Radix Primitives and shadcn/ui architectures.
- Chromatic / Storybook docs.

**Drills**
- Use an AI agent to scaffold the React code for your `Stack` component based on your Figma API.

**🏆 Boss: The Coded Compound with Testing**
Implement your Compound Component in React, styled with your generated CSS variables. Stand up Storybook. Wire up Chromatic for visual regression testing and capture a baseline.

---

### 📖 Level 6 — Documentation & Friction
*Rank: Docwright.*

**Theory (first principles)**
- **Why Interactive Playgrounds?** Adoption is inversely proportional to friction. If an engineer can't copy-paste working code instantly, they will build it themselves. Docs are a product; engineers are the users.
- Document decisions, not just usage. The "why" behind a token is what future-you (and AI agents) need.

**Resources**
- Polaris, Carbon, Material 3 documentation.

**Drills**
- Write your token tier philosophy in 200 words.

**🏆 Boss: The Stranger Test with Playgrounds**
Write docs for your Compound Component in Storybook MDX, including interactive code snippets. Hand the docs to a stranger (or fresh AI session) with one task: "build a settings page using these layouts."
- *Pass condition:* They succeed without asking you any clarifying questions.

---

### 🏛️ Level 7 — Governance & Metrics
*Rank: Governor.*

**Theory (first principles)**
- **Why Metrics?** You cannot govern what you cannot measure. Without usage data (detachment rates, codebase adoption), deprecations are guesswork.
- Systems fail **socially before they fail technically**.
- **Semver for design systems:** what's breaking? Renaming a token, removing a variant. Breaking changes need deprecation windows and migration guides.

**Resources**
- Nathan Curtis essays on Governance and Versioning.

**Drills**
- Classify 6 changes as major/minor/patch.

**🏆 Boss: Ship a Breaking Change & Measure It**
1. Write a governance RFC: review process, semver policy.
2. Execute a breaking change: rename a semantic token, bump to v2.0.0, write migration notes.
3. Establish a method for tracking metrics (e.g., using an AST scanner script to count component imports in a repo).
- *Pass condition:* v2 ships with zero dangling references.

---

### 🤖 Level 8 — The AI Layer: Context Engineering
*Rank: Agent Whisperer.*

**Theory (first principles)**
- **Why Context Engineering?** LLMs hallucinate UI unless constrained. An AI agent is like an enthusiastic junior designer with amnesia. You must provide a strict, machine-readable vocabulary (`CLAUDE.md`, Code Connect, Storybook) to force it to stay on-system.
- **Figma MCP server:** Agents extract variables, components, and layout from your files.
- The new senior skill: curating exactly what the agent knows, and proving the output stays on-system.

**Resources**
- Figma MCP server docs, Code Connect docs.

**Drills**
- Draft a `CLAUDE.md` for your system: token tiers, naming rules, component APIs, "never invent values" rule.

**🏆 Boss: The A/B Agent Experiment**
Wire Claude Code to the Figma remote MCP server. Add a Code Connect mapping. Run the same prompt twice — "build a settings page for my app" — once **without** your CLAUDE.md/Code Connect, once **with**.
- *Pass condition:* The "with-context" output passes the token audit (no invented hex/px, uses mapped components); the "without" output visibly fails.

---

### 👑 Level 9 — Final Boss: Ship the System + Case Study
*Rank: System Architect.*

Assemble everything into the terminal portfolio artifact:

1. **The repo** — tokens.json, GitHub Action build, Chromatic tests, components, deployed Storybook, governance docs, CLAUDE.md.
2. **The Figma library** — published, variables + modes + documented components.
3. **The case study** (<10 min read): problem → architecture (tiers, modes, accessible math) → pipeline → governance → the AI workflow A/B evidence.
4. **The demo** — 2-minute screen recording: change a token in Figma → watch CI/CD propagate to code → run Chromatic test → prompt an agent → get on-system UI.

*Pass condition:* All four exist, cross-linked, and public-repo-ready. The app confers the rank and exports a summary page for your portfolio site.

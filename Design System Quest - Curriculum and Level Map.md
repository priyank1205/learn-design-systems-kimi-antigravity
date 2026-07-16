# Design System Quest — Curriculum & Level Map

*A spec for a gamified, AI-tutored learning app that takes a senior product designer from "never touched a design system" to "built, governed, and made one agent-readable." Last updated: July 2026.*

---

## 0. Design principles (read before building anything)

1. **The game is thin; the work is real.** The app provides the quest map, XP, streaks, quizzes, an AI tutor, and verification. Every boss fight produces an artifact in the actual industry stack — Figma, tokens.json, Style Dictionary, Storybook, Claude Code. Nothing is simulated inside the app.
2. **Everything terminates in a portfolio artifact.** Each level deposits a piece into a `/portfolio` folder. The final boss assembles them into a mini design system + written case study. That artifact — not the XP — is what gets the job.
3. **Quests are sized for one sitting.** 30–90 minutes each. A visible "next action" always exists. Reading never blocks building for long: theory node → tiny drill → boss.
4. **Verification is real, not honor-system.** Wherever an artifact is code/JSON, the app checks it programmatically (schema validation, build success, token audits). Figma work uses checklists + screenshots in v1.
5. **Depth over coverage.** This curriculum is opinionated and links out to living sources rather than re-hosting content. The AI layer especially changes monthly — Level 8's resource list is dated and should be refreshed each run.
6. **The tutor teaches from first principles.** Every concept gets a "why does this exist at all" framing before the "how." The tutor is Socratic and is *forbidden* from producing boss artifacts.

---

## 1. The game shell (keep it this thin)

### 1.1 Screens
- **Quest map** — linear path of 10 nodes (Prologue → Level 8 → Final Boss) plus optional side-quest branches.
- **Level page** — three tabs: **Learn** (theory + resources), **Practice** (drills + quiz), **Boss** (quest brief, submission, verification result).
- **Profile** — XP, streak, rank, artifact vault (mirror of the `/portfolio` folder).

### 1.2 Progression & XP economy
| Action | XP |
|---|---|
| Finish a reading/watch | 10 |
| Pass a quiz (5 questions, ≥80%) | 15 |
| Complete a drill | 25 |
| Beat a boss | 150 (Levels 7–8: 300) |
| Daily streak multiplier | ×1.1, caps at ×2.0 |

Bosses gate progress: boss *N* must pass before level *N+1* unlocks. Side quests are optional and award XP only.

**Ranks** (one per level, for flavor): Déjà-Vu Hunter → Token Smith → Variable Wrangler → Component Architect → Pipeline Engineer → Storybook Keeper → Docwright → Governor → Agent Whisperer → **System Architect**.

### 1.3 The AI tutor
- Explains each concept from first principles with analogies, then quizzes adaptively.
- Reviews written artifacts (reflections, RFCs, docs) against a rubric and gives actionable feedback.
- **Hard rule:** on boss screens the tutor answers questions and offers a 3-level hint ladder, but never writes the artifact. This is the anti-procrastination guardrail — the game can't play itself.

### 1.4 Verification engine (per quest type)
| Artifact type | How the app verifies |
|---|---|
| Token JSON | Parses; checks DTCG structure (`$value`/`$type`); all `{references}` resolve; semantic tier contains references, not raw hex |
| Builds (Style Dictionary, Tailwind) | Runs the build; checks output files exist and contain expected token names |
| Component code / HTML | Grep audit: no raw hex/px outside the generated token file; Storybook starts; stories exist |
| Figma artifacts | Checklist + screenshot upload (v1); optional later: verify variable collections/modes via Figma MCP |
| Written artifacts | AI rubric review (rubric stored per quest) |

Implement checkers as small scripts the app runs — even if the scripts themselves are AI-generated at build time, verification at run time is objective.

### 1.5 Content model
All content (theory text, resource links, quiz questions, quest briefs, rubrics) lives in plain Markdown/JSON files. **Do not build a CMS.** Edit by hand or with an agent.

---

## 2. The system you'll build (the through-line)

Across all levels you construct one coherent mini design system — pick a fictional product (a habit tracker, a recipe app, anything you'd enjoy re-theming):

- **Tokens:** ~40–60 across color, spacing, typography, radius — primitive → semantic → component tiers, DTCG-format JSON
- **Modes:** light + dark (side quests: density, second brand)
- **Components:** Button, Input, Card, Badge (+1 of your choice) — in Figma *and* in code
- **Pipeline:** Figma → Tokens Studio → tokens.json (Git) → Style Dictionary → CSS variables + Tailwind theme
- **Docs:** Storybook with usage/anatomy/do-don't pages
- **Governance:** contribution + versioning + deprecation RFC, one executed breaking change
- **AI layer:** CLAUDE.md system rules, Code Connect mapping, Claude Code generating on-system UI via Figma MCP
- **Case study:** the capstone write-up tying it together

---

## 3. The level map

---

### 🗺️ Level 0 — Prologue: Why Systems Exist
*Unlock condition: none. Rank: Déjà-Vu Hunter.*

**Theory (first principles)**
- A design system is **cached decisions**. Every recurring UI question ("which blue? how much padding?") answered once and reused, instead of re-decided per screen.
- Decision math: *N* designers × *M* screens produce O(N·M) ad-hoc decisions; a system collapses that to O(N). Inconsistency isn't an aesthetic flaw — it's compounding maintenance cost and eroded user trust.
- The system is a **contract** between design and engineering: a shared vocabulary where "primary button" means one identical thing to both sides.
- A system exists to serve the product and its team — a system nobody adopts is a museum, not a product.

**Resources**
- *Atomic Design*, Brad Frost — ch. 1–2 re-read with fresh eyes (free online: https://atomicdesign.bradfrost.com)
- "What is a Design System?" and related essays — Nathan Curtis (https://medium.com/@nathanacurtis)
- *Design Systems Handbook* — DesignBetter (free: https://www.designbetter.co/design-systems-handbook)
- Skim a real system's "Foundations" section: Shopify Polaris (https://polaris.shopify.com) or IBM Carbon (https://carbondesignsystem.com)

**Drills**
- Find 3 different "primary" buttons in one product you use daily; screenshot them.
- Quiz: 5 questions on the theory above.

**🏆 Boss: The Interface Inventory**
Screenshot 8–10 screens of one product (yours or a public app like Spotify/Airbnb). Crop every button into a single Figma page. Count the near-duplicates. Write 150 words: what does this cost at 10× the screens and 5× the designers?
- *Verify:* checklist + screenshot; AI rubric on the reflection (must name consistency cost, maintenance cost, and user trust).
- *Portfolio:* the inventory page + reflection.

---

### 🪙 Level 1 — Tokens from First Principles
*Rank: Token Smith.*

**Theory (first principles)**
- A token is a **named decision**. The name is the API; the value is an implementation detail.
- **Indirection** is the whole trick: components reference *purpose* (`color.action.primary`), never *value* (`#3B82F6`). Then a decision can change everywhere without touching any consumer.
- **Three tiers**, each answering a different question:
  - *Primitive* — what exists? Raw, context-free palette/scales (`blue.500`, `space.4`).
  - *Semantic* — what does it mean? Context-aware aliases (`color.surface.default`, `color.text.danger`).
  - *Component* — where is it used? (`button.background.hover` → `color.action.primary.hover`).
- **DTCG anatomy:** every token has `$value`, `$type`, optional `$description`; references use `{color.blue.500}` syntax. The DTCG format hit its **first stable version (2025.10)** — it's the closest thing to an industry standard, so we build on it from day one.
- Naming is the hardest problem in the whole field. Convention: category → concept → property → variant → state.

**Resources**
- DTCG spec + glossary: https://www.designtokens.org (living drafts at /TR/drafts)
- "Intro to Design Tokens" — Tokens Studio docs: https://docs.tokens.studio/fundamentals/design-tokens/
- Token naming guides — Tokens Studio docs: https://docs.tokens.studio/manage-tokens/token-names/
- "Naming Tokens in Design Systems" — Nathan Curtis (via https://medium.com/@nathanacurtis)

**Drills**
- Given 5 raw hex values, write primitive names; given a UI screenshot, propose semantic names; spot the tier violation in 3 examples.
- Quiz: primitive vs. semantic vs. component; why indirection; what `$type` does.

**🏆 Boss: Your First tokens.json**
Hand-write a DTCG-format `tokens.json`: ≥6 primitive colors, a 4pt spacing scale, a semantic tier (surface/text/action, with light **and** dark values), and 3 component tokens for a Button. No tooling — just you and a text editor. (Feeling the pain of hand-authoring is the point; it makes Level 4's pipeline meaningful.)
- *Verify:* JSON parses; `$value`/`$type` present; all `{references}` resolve; semantic tier contains zero raw hex.
- *Portfolio:* `tokens.json` v0.1.0.

---

### 🎛️ Level 2 — Figma Variables & Modes
*Rank: Variable Wrangler.*

**Theory (first principles)**
- Figma variables are **Figma-native tokens**: collections ≈ token tiers, groups ≈ token groups, aliases ≈ references.
- **Modes are context axes**: the dimensions along which values change — light/dark, brand A/B, density, language. One collection, *N* contexts, zero duplicated components.
- Variables vs. styles: styles bundle multiple properties; variables are atomic, aliasable, and mode-aware. Scoping controls where a variable may be applied.
- The mapping you built in your head in Level 1 now has a native home — this is where tokens stop being theory.

**Resources**
- Figma Help Center — the variables & modes guides: https://help.figma.com (search "Guide to variables in Figma" / "modes")
- Figma's official YouTube tutorials on variables and modes: https://www.youtube.com/@Figma
- Christine Vallaure's practical variables writing: https://christinevallaure.substack.com

**Drills**
- Rebuild your Level 1 primitives as one collection; semantic tier as a second collection with Light/Dark modes, aliasing into primitives.
- Scope color variables so fills/strokes/text only see appropriate tokens.

**🏆 Boss: The Re-Theming Card**
Design a profile card (avatar, name, bio, one button) fully bound to semantic variables. Add a mode switch.
- *Pass condition:* toggling the frame's mode re-themes the entire card with **zero** manual edits; Inspect shows no raw hex anywhere.
- *Verify:* checklist + before/after screenshots.
- *Portfolio:* Figma library file, v0.2.0.

---

### 🧱 Level 3 — Component Architecture
*Rank: Component Architect.*

**Theory (first principles)**
- A component is an **API**: variants and props are its signature. Design the API before the pixels — consumers will depend on it.
- Atomic Design maps onto reality here: atoms ≈ tokens + base components; molecules/organisms are **composition**. Prefer composition over configuration; prefer slots (icon slot) over boolean sprawl.
- **States are first-class:** default, hover, focus, active, disabled, loading, error. If a state isn't in the system, it will be invented on a deadline.
- **The token audit:** every visual property of a component must trace to a token. A component with a raw hex is a bug.

**Resources**
- Figma Help Center — component properties & variants guides: https://help.figma.com
- Component API thinking: study the Button pages of Shopify Polaris (https://polaris.shopify.com) and GitHub Primer (https://primer.style) — note how props map to variants
- "Component Specifications" — Nathan Curtis (EightShapes)

**Drills**
- Draw the anatomy of a Button (container, label, icon slot, padding tokens, state layers).
- Critique: find 2 prop/API decisions on Polaris' Button page you'd make differently, and say why.

**🏆 Boss: The Button Component Set**
Build Button in Figma: 3 variants (primary/secondary/ghost) × 2 sizes × states (default/hover/pressed/disabled), auto layout, icon slot, every fill/type/spacing bound to variables.
- *Pass condition:* token audit passes (no unbound properties); changing one semantic token re-skins **all** variants at once.
- *Verify:* checklist + screenshots; optional Figma MCP audit.
- *Portfolio:* the component set + anatomy diagram.

---

### 🔄 Level 4 — The Pipeline: Single Source of Truth
*Rank: Pipeline Engineer.*

**Theory (first principles)**
- **Drift is the default.** Design and code diverge unless something mechanically prevents it. That something is the pipeline.
- `tokens.json` is the product; **everything else is a build artifact.** The flow: Figma (authoring) → Tokens Studio (export/sync) → tokens.json in Git (source of truth) → Style Dictionary (transform) → CSS variables / Tailwind theme / anything (distribution).
- Transforms adapt names/values per platform (kebab-case, px→rem); formats define output files. Style Dictionary v4 is the current major version.
- Version the tokens file like code — this foreshadows Level 7's governance.

**Resources**
- Style Dictionary docs: https://styledictionary.com (+ GitHub: https://github.com/style-dictionary/style-dictionary)
- Tokens Studio docs (export from Figma, GitHub sync): https://docs.tokens.studio
- "A Design Tokens Workflow" series — Stuart Robson: https://www.alwaystwisted.com/articles/a-design-tokens-workflow-part-1.html
- Tokens Studio on Style Dictionary v4 changes: https://tokens.studio/blog/style-dictionary-v4-plan

**Drills**
- Export your Figma variables via Tokens Studio to DTCG JSON; diff it against your hand-written Level 1 file.
- Run the Style Dictionary basic example; read the generated CSS.

**🏆 Boss: One Change Propagates**
Wire the full pipeline: Figma → Tokens Studio → `tokens.json` → Style Dictionary → `variables.css` + Tailwind theme. Build a plain HTML page (your profile card, recreated) styled **only** with generated CSS variables, with a light/dark toggle.
Then the epiphany test: change one semantic token **in Figma**, re-export, rebuild — the page updates. No hand-edited CSS allowed, ever.
- *Verify:* build script runs clean; output contains expected var names; grep audit finds no raw hex in HTML/CSS outside the generated token file.
- *Portfolio:* repo with `tokens.json` + build script + generated outputs.

---

### 💻 Level 5 — Components in Code & Storybook
*Rank: Storybook Keeper.*

**Theory (first principles)**
- The coded library is the **other projection** of the same system. Design and code are two views of one truth; parity is the goal (prop names mirror Figma variant names — the contract again).
- **Storybook** is a workbench and living documentation: a *story* is the code equivalent of a Figma variant — one state, rendered live, props defined.
- Modern component stack thinking: headless primitives (Radix) own behavior + accessibility; your tokens own the look. shadcn/ui popularized a distribution model where you **own the component source** — which, conveniently, is also the most agent-friendly model, since AI coding tools can read and edit source in your repo.
- Tailwind enters here as a *consumer* of tokens: your semantic tokens compile into the Tailwind theme, so utilities like `bg-action-primary` stay on-system. (Tailwind is a framework, not a system — the tokens are the system.)

**Resources**
- Storybook tutorials hub: https://storybook.js.org/tutorials (esp. *Design Systems for Developers*)
- Radix Primitives: https://www.radix-ui.com/primitives
- shadcn/ui: https://ui.shadcn.com — read how it layers on Radix + Tailwind (primer: https://vercel.com/i/shadcn-vs-radix)

**Drills**
- Stand up Storybook in your repo; write one "Hello" story.
- Install shadcn/ui's Button in a scratch project; read the source; note where tokens/CSS vars live.

**🏆 Boss: The Coded Button**
Implement your Level 3 Button in React, styled with your generated CSS variables (or Tailwind theme). Stories for every variant × size × state, plus an autodocs page.
- *Pass condition:* side-by-side Figma vs. Storybook screenshots match to your own eyeball standard; a11y checks pass; grep audit: no hard-coded values in component files.
- *Verify:* Storybook builds; stories enumerated; grep audit.
- *Portfolio:* component code + deployed Storybook (Chromatic or GitHub Pages).

---

### 📖 Level 6 — Documentation: The System Is a Product
*Rank: Docwright.*

**Theory (first principles)**
- A design system is a **product** whose customers are designers and engineers. Docs are its UI; adoption is the metric.
- Anatomy of a great component page: when to use / when *not* to, anatomy, variants, props, tokens used, do/don't pairs, accessibility notes.
- **Document decisions, not just usage.** The "why" behind a token or prop is what future-you (and, soon, AI agents) need. Rationale is a first-class artifact.

**Resources**
- Study world-class docs as artifacts: Polaris (https://polaris.shopify.com), Carbon (https://carbondesignsystem.com), Material 3 (https://m3.material.io), Atlassian (https://atlassian.design)
- Nathan Curtis's documentation essays: https://medium.com/@nathanacurtis
- Optional deep cut: *Expressive Design Systems* by Yesenia Perez-Cruz

**Drills**
- Rewrite one Polaris "do/don't" pair for your own Button.
- Write your token tier philosophy in 200 words: why three tiers, why these names.

**🏆 Boss: The Stranger Test**
Write docs for your tokens (tiers, naming rules) and your Button (usage, anatomy, props, tokens, do/don'ts) in Storybook MDX. Then hand the docs to someone with zero context — a friend, or an AI agent in a fresh session — with one task: "build a settings row with a destructive action."
- *Pass condition:* they pick the right component and tokens **without asking you anything**. Every question they had to ask becomes a doc fix.
- *Verify:* AI rubric + test transcript.
- *Portfolio:* docs pages + test notes.

---

### 🏛️ Level 7 — Governance: Versioning, Contribution, Deprecation
*Rank: Governor. (The level that separates senior candidates.)*

**Theory (first principles)**
- Systems fail **socially before they fail technically**. The hard problems are adoption, contribution, and change management — not pixels.
- Team models (Nathan Curtis): **solitary** (one team builds for itself), **centralized** (a dedicated team serves all), **federated** (product teams co-own). Know the tradeoffs; interviewers ask.
- **Semver for design systems:** what's breaking? Renaming/removing a token, changing a semantic mapping, removing a variant. Breaking changes need deprecation windows, changelogs, and migration guides.
- Measure what matters: adoption coverage, Figma detachment rate, % of UI built from system parts.

**Resources**
- Nathan Curtis — "Team Models for Scaling a Design System" and versioning/governance essays: https://medium.com/@nathanacurtis
- EightShapes' public design-systems work: https://eightshapes.com
- Real governance in the wild: read Carbon's or Primer's contribution docs on GitHub

**Drills**
- Classify 6 changes as major/minor/patch (e.g., "adjust `space.4` from 16px to 20px" vs. "rename `color.action.primary`").
- Sketch a contribution flow for a hypothetical 5-designer team.

**🏆 Boss: Ship a Breaking Change Properly**
1. Write a 1–2 page **governance RFC** for your mini-system: who can contribute, review process, semver policy, deprecation policy, adoption metrics.
2. Execute a breaking change end-to-end: rename a semantic token (e.g., `color.action.primary` → `color.action.brand`), bump to v2.0.0, write the changelog + migration notes, update Figma, pipeline, code, and docs. Include a find/replace "codemod" step for consumers.
- *Pass condition:* v2 ships with zero dangling references to the old name (script checks), and the migration notes would let a stranger upgrade unaided.
- *Verify:* grep audit for old token name; AI rubric on the RFC.
- *Portfolio:* RFC + changelog + migration guide. **This folder alone is interview gold.**

---

### 🤖 Level 8 — The AI Layer: Agent-Readable Systems
*Rank: Agent Whisperer. Resources in this level are dated — refresh before each run.*

**Theory (first principles)**
- An agent doesn't "see" your system; it reads whatever context you provide. Off-system output is a **context failure**, not a model failure.
- A machine-readable system = DTCG tokens + component descriptions + Code Connect mappings + rules files (`CLAUDE.md`/`AGENTS.md`, cursor rules) + Storybook stories (behavioral spec). Each layer answers a different agent question.
- **Figma MCP server** (now remote-hosted): agents extract variables, components, and layout from your files and generate code referencing the *real* system; write-to-canvas skills let agents create on-system Figma content. **Code Connect** points agents at your actual code components instead of hallucinated markup.
- **Figma's own canvas agent** (launched May 2026) @-mentions tokens/variables/components and does bulk on-system edits and documentation — the system is literally the agent's vocabulary.
- The new senior skill: **context engineering for a design system** — curating exactly what the agent knows, and proving the output stays on-system.

**Resources** *(as of July 2026)*
- Figma MCP server docs: https://developers.figma.com/docs/figma-mcp-server/
- Code Connect docs + quickstart: https://developers.figma.com/docs/code-connect/
- "The Figma Design Agent is Here" — Figma blog (May 2026): https://www.figma.com/blog/the-figma-agent-is-here/
- "Workflow lab: Code to canvas" — Figma Help Center: https://help.figma.com/hc/en-us/articles/40219873508247-Workflow-lab-Code-to-canvas
- "Agentic AI, Design Systems & Figma: A Practical Guide" — Christine Vallaure (Apr 2026): https://christinevallaure.substack.com/p/agentic-ai-design-systems-and-figma
- "AI + Design Systems in 2026: The Workflow I Actually Use" (video): https://www.youtube.com/watch?v=XfezMs8B-O8
- Into Design Systems — AI Design Systems Conference recordings: https://www.intodesignsystems.com

**Drills**
- Write component descriptions for your Figma Button (the MCP reads these — see how much better agent output gets).
- Draft a `CLAUDE.md` for your system: token tiers, naming rules, component APIs, "never invent values" rule.

**🏆 Boss: The A/B Agent Experiment**
Wire Claude Code to the Figma remote MCP server. Add a Code Connect mapping for your Button. Then run the same prompt twice — "build a settings page for my app" — once **without** your CLAUDE.md/Code Connect, once **with**.
- *Pass condition:* the "with-context" output passes the token audit (no invented hex/px, uses mapped components); the "without" output visibly doesn't.
- *Verify:* grep audit on both outputs; save the diff.
- *Portfolio:* the two outputs + diff + a screen recording of the on-system generation. **This is the demo that makes interviewers lean forward.**

---

### 👑 Level 9 — Final Boss: Ship the System + Case Study
*Rank: System Architect.*

Assemble everything into the terminal artifact:

1. **The repo** — tokens.json, Style Dictionary build, components, deployed Storybook, governance docs, CLAUDE.md. A senior designer could clone it and run the system.
2. **The Figma library** — published, variables + modes + documented components.
3. **The case study** (<10 min read): the problem → architecture decisions (tiers, naming, modes) → the pipeline → governance → **the AI workflow, with your A/B evidence** → "what I'd do at 100× scale."
4. **The demo** — 2-minute screen recording: change a token in Figma → watch it propagate to code → prompt an agent → get on-system UI.

*Pass condition:* all four exist, cross-linked, and public-repo-ready. The app confers the rank and exports a summary page for your portfolio site.

---

## 4. Interview translation cheat-sheet

| You completed | You can say |
|---|---|
| Levels 1–2 | "I designed a three-tier, DTCG-aligned token architecture with Figma variables and light/dark modes." |
| Level 3 | "I designed component APIs — variants, props, states — with full token binding, and I can defend the API tradeoffs." |
| Level 4 | "I built the Figma → Style Dictionary → Tailwind pipeline; one token change propagates from design to production CSS." |
| Level 5 | "I shipped the coded components with Storybook docs and design-code parity." |
| Level 6 | "I treated the system as a product: adoption-oriented docs, validated by a zero-context stranger test." |
| Level 7 | "I wrote the governance model — contribution, semver, deprecation — and executed a breaking change with a migration path." |
| Level 8 | "I made the system agent-readable: Figma MCP + Code Connect + rules files, and I measured the difference in agent output quality with and without that context." |

---

## 5. Side quests (optional, replayable, XP-only)

- **Reverse-engineer a giant:** pull Polaris' or Carbon's public token JSON from GitHub; map their tiers against yours; steal three good ideas, document why.
- **Density mode:** add comfortable/compact spacing modes to Level 2's collection.
- **Second brand:** multi-brand theming via a brand mode — the classic enterprise interview topic.
- **Contrast audit:** WCAG-check every semantic color pairing in both modes; fix failures *in tokens*.
- **Alt toolchain:** try a DTCG-native alternative to Style Dictionary (e.g., Terrazzo) and write a comparison note.

## 6. Staying current after the game ends

- **People/orgs:** Nathan Curtis (EightShapes), Brad Frost, Jina Anne (coined "design tokens" at Salesforce), Tokens Studio, Romina Kavcic, Christine Vallaure
- **Venues:** Into Design Systems conference + community, Figma Config talks, the DTCG GitHub discussions
- **Habit:** re-run your Level 8 A/B experiment every few months as tooling changes — it's both your radar and an evergreen portfolio update.

## 7. Suggested build order for the app itself (MVP discipline)

1. Quest map + content files (Markdown/JSON) — no backend cleverness
2. Quiz engine + XP/streaks
3. Boss checkers for Levels 1 and 4 first (pure code, easiest to verify objectively)
4. AI tutor chat with the no-artifacts guardrail
5. Artifact vault + screenshot checklists (manual Figma verification)
6. Only then: Figma-MCP-based verification, deployed Storybook checks, fancy stuff

*The meta-rule, one more time: if building the app ever competes with doing the quests, the app loses. Vibecode the thinnest shell that makes you want to open it daily — then go do Level 0.*

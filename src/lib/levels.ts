export interface Resource {
  title: string;
  description: string;
  url: string;
  icon?: string;
}

export interface LevelMetadata {
  id: string;
  index: number;
  title: string;
  rank: string;
  description: string;
  icon: string;
  theoryMarkdown?: string;
  resources?: Resource[];
}

export const LEVELS: LevelMetadata[] = [
  { 
    id: 'level-0', index: 0, title: 'Prologue: Why Systems Exist', rank: 'Déjà-Vu Hunter', description: 'The fundamentals and cost of inconsistency.', icon: '🗺️',
    theoryMarkdown: `
## 01 A design system is cached decisions

Every UI is a stream of recurring questions: which blue, how much padding, what happens on hover, what does "danger" look like. Without a system, every designer re-answers these questions on every screen. With a system, each question is answered <mark>once</mark>, deliberately, and the answer is reused everywhere.

That is the first-principles core: a design system is not a component library, not a Figma file, not a style guide PDF. It is <mark>a cache of decisions</mark> with an interface for looking them up.

> If you remember one sentence from this level: the system is the decisions; the library is just their shipping container.

## 02 The decision math

With N designers and M screens, ad-hoc decisions grow as <mark>O(N × M)</mark> — every person, every surface, another chance for a slightly different blue. Inconsistency compounds silently: near-duplicate buttons, drifted spacing, four grays that used to be one.

The cost is not aesthetic. It is <mark>maintenance</mark> (fixing the same thing N times), <mark>velocity</mark> (re-deciding instead of designing), and <mark>user trust</mark> (a product that feels stitched together teaches people not to trust it). A system collapses O(N × M) back to O(N): decide once, propagate everywhere.

## 03 The contract

A design system is a <mark>shared vocabulary between design and engineering</mark>. When both sides say "primary button" and mean one identical thing — same tokens, same states, same behavior — handoffs stop being translations and start being references.

This is why senior roles care about systems: they are less about pixels than about <mark>how a team scales its judgment</mark>. And the corollary: a system nobody adopts is a museum. Adoption, not artifact count, is the success metric.
`,
    resources: [
      { title: "Atomic Design (free online) — ch. 1–2", description: "You read it; re-read the opening with systems-as-decisions goggles on.", url: "https://atomicdesign.bradfrost.com", icon: "book" },
      { title: "Nathan Curtis — design system essays", description: "The godfather of the field. Start anywhere; his definitions stick.", url: "https://medium.com/@nathanacurtis", icon: "article" },
      { title: "Design Systems Handbook — DesignBetter", description: "Free. Good chapter on why systems are a product, not a project.", url: "https://www.designbetter.co/design-systems-handbook", icon: "book" },
      { title: "Shopify Polaris — Foundations", description: "Skim how a world-class system frames its own purpose.", url: "https://polaris.shopify.com", icon: "article" }
    ]
  },
  { 
    id: 'level-1', index: 1, title: 'Tokens from First Principles', rank: 'Token Smith', description: 'Primitive, semantic, and component token tiers.', icon: '🪙',
    theoryMarkdown: `
## 01 Naming the invisible

A design token is fundamentally a <mark>named decision</mark>. The name acts as an API, while the value itself is merely an implementation detail. When we hardcode \`#3B82F6\`, we are communicating a value. When we use a token like \`color.action.primary\`, we are communicating <mark>intent</mark>.

<mark>Indirection</mark> is the magic trick of design systems. Because components reference the *purpose* rather than the *value*, a single decision can be changed centrally, and that change propagates everywhere without touching a single consumer.

## 02 The three tiers of architecture

A robust system isn't a flat list of colors. It requires a tiered architecture where each layer answers a fundamentally different question:

1. **Primitive tier**: <mark>What exists?</mark> These are your raw, context-free scales (e.g., \`blue.500\`, \`space.4\`). They are the alphabet of your system.
2. **Semantic tier**: <mark>What does it mean?</mark> These are context-aware aliases (e.g., \`color.surface.default\`, \`color.text.danger\`). This tier allows theming and dark modes to exist.
3. **Component tier**: <mark>Where is it used?</mark> These map semantics to specific component properties (e.g., \`button.background.hover\` → \`color.action.primary.hover\`).

> Tier violations are the #1 cause of brittle systems. Never let a component reference a primitive directly.

## 03 The DTCG standard

The Design Tokens Community Group (DTCG) format hit its first stable version in 2025. This is the industry standard structure. Every token has a \`$value\`, a \`$type\` (like color, dimension), and optional \`$description\`. Aliases use the \`{color.blue.500}\` reference syntax. Naming is hard, but sticking to a strict taxonomy (Category → Concept → Property → Variant) keeps chaos at bay.
`,
    resources: [
      { title: "DTCG spec + glossary", description: "The official spec from the W3C Design Tokens Community Group.", url: "https://www.designtokens.org", icon: "article" },
      { title: "Intro to Design Tokens", description: "Tokens Studio foundational documentation.", url: "https://docs.tokens.studio/fundamentals/design-tokens/", icon: "book" },
      { title: "Naming Tokens in Design Systems", description: "Nathan Curtis on taxonomies and conventions.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-2', index: 2, title: 'Figma Variables & Modes', rank: 'Variable Wrangler', description: 'Mapping tokens to Figma variables and modes.', icon: '🎛️',
    theoryMarkdown: `
## 01 Variables are native tokens

Figma variables represent a paradigm shift: they are <mark>Figma-native design tokens</mark>. For years, designers relied on plugins or rigid styles. Variables bring the architecture of code directly into the design tool.

In Figma, variable **collections** represent your token tiers (Primitives vs Semantics), variable **groups** act as your taxonomy paths, and variable **aliases** are your references. The mental model you built for JSON now maps 1:1 with Figma's UI.

## 02 Modes are context axes

The true power of variables lies in <mark>Modes</mark>. A mode represents a dimension along which values change based on context. 

Common mode axes include Light vs. Dark, Brand A vs. Brand B, or Compact vs. Comfortable density. With modes, you maintain <mark>one single collection</mark> and zero duplicated components. You simply toggle the mode on a Frame, and the underlying variables resolve dynamically based on that context.

> Variables differ from Styles fundamentally: Styles bundle multiple properties (fill, stroke, effects). Variables are atomic, strictly typed, and mode-aware.

## 03 Scoping for safety

Figma allows you to <mark>scope</mark> variables, restricting where they can be applied. A spacing variable shouldn't be applied to a corner radius; a text color shouldn't be used as a background fill. Proper scoping reduces cognitive load for consumers and prevents egregious design errors at the source.
`,
    resources: [
      { title: "Guide to variables in Figma", description: "Figma Help Center's official documentation.", url: "https://help.figma.com", icon: "article" },
      { title: "Figma Variables Tutorials", description: "Figma's official YouTube walkthroughs.", url: "https://www.youtube.com/@Figma", icon: "video" },
      { title: "Practical Variables Writing", description: "Christine Vallaure's deep dives on variable setups.", url: "https://christinevallaure.substack.com", icon: "article" }
    ]
  },
  { 
    id: 'level-3', index: 3, title: 'Component Architecture', rank: 'Component Architect', description: 'Designing component APIs and state layers.', icon: '🧱',
    theoryMarkdown: `
## 01 The Component API

A component is fundamentally an <mark>API</mark>. Its variants and properties are its signature. You must design this API before pushing a single pixel, because engineers and other designers will depend on it. 

We apply Atomic Design principles here: atoms (tokens + base elements) combine into molecules, which form organisms. However, modern systems strongly favor <mark>composition over configuration</mark>. Instead of boolean sprawl (having 50 toggles on a card), we use slots and sub-components to keep APIs clean and extensible.

## 02 States are first-class citizens

In a robust system, a button is never just a button. It is a matrix of states.

You must design the <mark>default, hover, focus, active, disabled, loading, and error</mark> states upfront. If a state isn't explicitly defined in the system, it will be inevitably invented by an engineer on a tight deadline, resulting in drift.

> Focus rings are not an afterthought. Accessibility must be baked into the foundational state layers of every component.

## 03 The Token Audit

Every visual property of a component must trace back to a token. 

This is the ultimate test of a component's integrity. If you inspect a component and find a raw hex code or an arbitrary hardcoded pixel value, <mark>that is a bug</mark>. Components must be strictly bound to semantic tokens to survive re-theming and scaling.
`,
    resources: [
      { title: "Component properties & variants", description: "Figma Help Center guide to building APIs.", url: "https://help.figma.com", icon: "article" },
      { title: "Shopify Polaris: Button API", description: "Study how props map to variants in a world-class system.", url: "https://polaris.shopify.com", icon: "article" },
      { title: "Component Specifications", description: "Nathan Curtis on documenting components.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-4', index: 4, title: 'The Pipeline', rank: 'Pipeline Engineer', description: 'Single source of truth via Style Dictionary.', icon: '🔄',
    theoryMarkdown: `
## 01 Drift is the default

Entropy affects codebases just like the physical world. Without a mechanical forcing function, design and code will inevitably diverge. <mark>The pipeline</mark> is that forcing function.

The \`tokens.json\` file is your actual product. Everything else—Figma files, CSS variables, iOS Swift classes—is merely a <mark>build artifact</mark> derived from that single source of truth.

## 02 The mechanical flow

The standard industry pipeline operates sequentially:
1. **Authoring:** Designers manage variables in Figma.
2. **Extraction:** Plugins (like Tokens Studio) export these to a DTCG JSON format.
3. **Storage:** The JSON lives in Git as the absolute source of truth.
4. **Transformation:** A tool like Style Dictionary reads the JSON and transforms it.
5. **Distribution:** The transformed outputs (CSS variables, Tailwind config, JSON for iOS) are distributed to codebases.

> When a token changes, it changes in Git, triggering a build that updates all platforms simultaneously. No manual CSS edits.

## 03 Style Dictionary

Transforms adapt names and values per platform (e.g., converting a token name to \`kebab-case\` for CSS and \`camelCase\` for JS, or translating pixels to \`rem\` units). Formats define the actual output files. Versioning the tokens file exactly like software code sets the stage for strict system governance.
`,
    resources: [
      { title: "Style Dictionary Documentation", description: "The industry standard tool for token transformation.", url: "https://styledictionary.com", icon: "book" },
      { title: "Tokens Studio Documentation", description: "Exporting from Figma and syncing to GitHub.", url: "https://docs.tokens.studio", icon: "article" },
      { title: "A Design Tokens Workflow", description: "Stuart Robson's deep dive into token pipelines.", url: "https://www.alwaystwisted.com/articles/a-design-tokens-workflow-part-1.html", icon: "article" }
    ]
  },
  { 
    id: 'level-5', index: 5, title: 'Components in Code', rank: 'Storybook Keeper', description: 'React, Storybook, and component parity.', icon: '💻',
    theoryMarkdown: `
## 01 The other projection

The coded component library is the <mark>other projection</mark> of the exact same system. Design and code are merely two views of one truth. 

Parity is the ultimate goal. The prop names in React should perfectly mirror the variant names in Figma. When a designer says "Button, size large, variant ghost," the engineer should type exactly that. This is the contract in action.

## 02 Storybook as the workbench

Storybook is the industry standard workbench and living documentation environment. A <mark>story</mark> is the code equivalent of a Figma variant—it isolates one specific state of a component, renders it live, and explicitly defines its props.

It serves as the definitive proof that a component works in isolation before it is ever integrated into the main application.

> If it's not in Storybook, it doesn't exist in the system.

## 03 Modern stack architecture

Modern component architecture relies heavily on <mark>headless primitives</mark> (like Radix UI). These primitives own the complex behavioral logic and accessibility (ARIA, focus trapping, keyboard navigation), while your tokens and CSS own the visual presentation.

Frameworks like Tailwind CSS act as *consumers* of your tokens. Your semantic tokens compile into the Tailwind theme, ensuring that utility classes like \`bg-action-primary\` are strictly on-system.
`,
    resources: [
      { title: "Storybook: Design Systems for Developers", description: "Official tutorial on building coded systems.", url: "https://storybook.js.org/tutorials", icon: "video" },
      { title: "Radix Primitives", description: "Unstyled, accessible components for building high-quality systems.", url: "https://www.radix-ui.com/primitives", icon: "article" },
      { title: "shadcn/ui Architecture", description: "Understanding the 'own your component source' model.", url: "https://ui.shadcn.com", icon: "book" }
    ]
  },
  { 
    id: 'level-6', index: 6, title: 'Documentation', rank: 'Docwright', description: 'Writing docs for a zero-context stranger.', icon: '📖',
    theoryMarkdown: `
## 01 The system is a product

A design system is a <mark>product</mark>, and its primary customers are the designers and engineers within your organization. 

The documentation is the User Interface of that product. If the UI is confusing, incomplete, or hostile, the product fails. <mark>Adoption is the only metric that matters.</mark>

## 02 Anatomy of a great component page

World-class documentation leaves no room for ambiguity. A great component page must include:
- **Intent**: When to use it, and crucially, when *not* to use it.
- **Anatomy**: A breakdown of the component's internal structure.
- **API**: Exhaustive list of variants and props.
- **Tokens**: The specific semantic tokens applied to its states.
- **Guidelines**: Clear "Do" and "Don't" visual pairings.
- **Accessibility**: Keyboard interactions and ARIA roles.

> Rationale is a first-class artifact. Documenting *why* a decision was made prevents endless debates from resurfacing months later.

## 03 The Stranger Test

The ultimate test of documentation is the <mark>Stranger Test</mark>. If you hand your docs to a new hire with zero context, can they successfully assemble a complex layout without asking you a single question? Every time they have to tap you on the shoulder to ask for clarification, you have discovered a bug in your documentation.
`,
    resources: [
      { title: "Shopify Polaris Docs", description: "The gold standard for comprehensive system documentation.", url: "https://polaris.shopify.com", icon: "book" },
      { title: "IBM Carbon Docs", description: "Enterprise-grade system documentation.", url: "https://carbondesignsystem.com", icon: "book" },
      { title: "Nathan Curtis on Documentation", description: "Essays on structuring system docs effectively.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-7', index: 7, title: 'Governance', rank: 'Governor', description: 'Versioning, deprecation, and shipping breaking changes.', icon: '🏛️',
    theoryMarkdown: `
## 01 Social failure before technical failure

Systems almost always fail <mark>socially</mark> before they fail technically. Generating CSS from JSON is solved; convincing 50 independent product teams to adopt that CSS and follow contribution protocols is the actual hard part.

The hardest problems in systems design are adoption, contribution, and change management.

## 02 Team models

How a system is governed depends on the organizational model:
- **Solitary**: One team builds it solely for their own use.
- **Centralized**: A dedicated, funded systems team builds and serves it to all product teams.
- **Federated**: Product teams co-own the system and contribute back in a distributed manner.

You must choose the model that fits your company's scale and culture.

> A centralized system with no federated contribution path becomes a bottleneck and breeds resentment.

## 03 Semantic versioning for design

When a system scales, changes cannot be reckless. We apply <mark>Semver</mark> to design.

What constitutes a breaking change? Renaming or removing a token, changing the fundamental semantic mapping of a color, or removing a variant from a component. 

Breaking changes require extreme discipline: deprecation windows, detailed changelogs, migration guides, and automated codemods to help consumers upgrade painlessly.
`,
    resources: [
      { title: "Team Models for Scaling a Design System", description: "Nathan Curtis on organizational structures.", url: "https://medium.com/@nathanacurtis", icon: "article" },
      { title: "EightShapes Design Systems", description: "Public resources on system governance.", url: "https://eightshapes.com", icon: "book" },
      { title: "GitHub Primer Contribution Docs", description: "Study real governance protocols in the wild.", url: "https://primer.style", icon: "article" }
    ]
  },
  { 
    id: 'level-8', index: 8, title: 'The AI Layer', rank: 'Agent Whisperer', description: 'Making the system machine-readable.', icon: '🤖',
    theoryMarkdown: `
## 01 The context failure paradigm

An AI agent does not intrinsically "see" your system. It only reads whatever context window you provide. 

When an agent hallucinates a Tailwind class or invents a hex code, it is rarely a model failure—it is a <mark>context failure</mark>. The machine was not provided the boundaries of the system.

## 02 Machine-readable architecture

A system built for the AI era must be strictly machine-readable. This requires multiple layers of context:
- **Tokens**: DTCG JSON files provide the exact visual vocabulary.
- **Components**: Figma descriptions and Storybook MDX provide the behavioral API.
- **Mappings**: Tools like Figma Code Connect explicitly link design elements to repo code.
- **Rules**: Explicit instruction files (\`CLAUDE.md\`, \`AGENTS.md\`) that strictly enforce the "never invent values" rule.

> The new senior engineering skill is Context Engineering: curating exactly what the agent knows, and proving its output remains strictly on-system.

## 03 The Figma MCP integration

With the advent of the Figma Model Context Protocol (MCP) server, agents can extract variables, components, and layout topology directly from your live Figma files. They generate code that references the *real* system, and can even execute write-to-canvas skills to generate on-system Figma content autonomously.
`,
    resources: [
      { title: "Figma MCP Server Docs", description: "Connect Claude to your Figma canvas.", url: "https://developers.figma.com/docs/figma-mcp-server/", icon: "article" },
      { title: "Code Connect Quickstart", description: "Map Figma components directly to your codebase.", url: "https://developers.figma.com/docs/code-connect/", icon: "book" },
      { title: "Agentic AI & Design Systems", description: "Practical guide to the AI workflow.", url: "https://christinevallaure.substack.com", icon: "article" }
    ]
  },
  { 
    id: 'level-9', index: 9, title: 'Final Boss', rank: 'System Architect', description: 'Ship the system and the capstone case study.', icon: '👑',
    theoryMarkdown: `
## 01 The terminal artifact

Your journey culminates in the assembly of the terminal artifact—a complete, functional, and governed mini design system. This isn't a theoretical exercise; it is a deployable product.

The final deliverable consists of four pillars:

1. **The Repository**: The \`tokens.json\` source of truth, the Style Dictionary build pipeline, the React components, the deployed Storybook documentation, and the AI context rules (\`CLAUDE.md\`). A senior designer should be able to clone it and run it immediately.
2. **The Figma Library**: A published library utilizing variables, modes, and fully documented component APIs.
3. **The Case Study**: A concise, powerful write-up detailing the core problem, the architectural decisions (tiers, naming, modes), the pipeline infrastructure, the governance model, and the AI workflow.
4. **The Demo**: A highly polished screen recording proving the system works end-to-end.

> Prove it. Change a token in Figma, watch it propagate automatically to the code, prompt an AI agent, and generate a pristine, on-system UI. That is the demo that gets you hired.
`,
    resources: [
      { title: "Case Study Best Practices", description: "How to frame your systems architecture for interviews.", url: "https://medium.com", icon: "article" }
    ]
  }
];

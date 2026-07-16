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
  requiresRepl?: boolean;
  replType?: 'json' | 'css';
}

export const LEVELS: LevelMetadata[] = [
  { 
    id: 'level-0', index: 0, title: 'Prologue: Why Systems Exist', rank: 'Déjà-Vu Hunter', description: 'The fundamentals and cost of inconsistency.', icon: '🗺️',
    theoryMarkdown: `
## 01 Why do systems exist?

A design system is **cached decisions**. Every recurring UI question ("which blue? how much padding?") is answered once and reused. 

**Decision math:** *N* designers × *M* screens produce O(N·M) ad-hoc decisions. A system collapses that back to O(N). The cost of inconsistency isn't just aesthetic; it's maintenance debt and eroded user trust.

## 02 The System vs. The Product

*Why do we draw a boundary between the system and the product?* Because a system that tries to do everything becomes an unmaintainable monolith. 

A system provides the **primitives**; the product provides the **context**. A system nobody adopts is a museum, not a product.

## 03 The Contract

A design system is a shared vocabulary between design and engineering. When both sides say "primary button" and mean one identical thing, handoffs stop being translations and start being references.
`,
    resources: [
      { title: "Atomic Design (free online)", description: "Re-read the opening with systems-as-decisions goggles on.", url: "https://atomicdesign.bradfrost.com", icon: "book" },
      { title: "What is a Design System?", description: "Nathan Curtis defines the field.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-1', index: 1, title: 'Tokens & The Math of Perception', rank: 'Token Smith', description: 'Primitive, semantic, and component token tiers.', icon: '🪙',
    requiresRepl: true,
    replType: 'json',
    theoryMarkdown: `
## 01 Why do tokens exist?

**Indirection** is the whole trick. A token is a named decision. Components reference *purpose*, never *value*. When we hardcode \`#3B82F6\`, we communicate a value. When we use \`color.action.primary\`, we communicate intent.

## 02 Why algorithms for color?

*Why not just pick what looks good?* Human color perception is non-linear. Accessibility must be baked into the primitive tier. You don't pick colors; you calculate accessible scales based on perceptual contrast (WCAG/APCA).

## 03 Why extract typography and space?

To prevent magic numbers. Fluid typography scales and shadow/elevation (mapping z-index to physics) are essential. *Composite tokens* bundle these into reusable styles.

## 04 The DTCG Anatomy

- **Primitive tier**: What exists? (e.g., \`blue.500\`)
- **Semantic tier**: What does it mean? (e.g., \`color.surface.default\`)
- **Component tier**: Where is it used? (e.g., \`button.background.hover\`)

Every token in the DTCG standard has a \`$value\`, a \`$type\`, and uses \`{references}\`.
`,
    resources: [
      { title: "DTCG spec", description: "The official spec from the W3C Design Tokens Community Group.", url: "https://www.designtokens.org", icon: "article" },
      { title: "Intro to Design Tokens", description: "Tokens Studio foundational documentation.", url: "https://docs.tokens.studio/fundamentals/design-tokens/", icon: "book" }
    ]
  },
  { 
    id: 'level-2', index: 2, title: 'Figma Variables, Modes, & Space', rank: 'Variable Wrangler', description: 'Mapping tokens to variables and contextual modes.', icon: '🎛️',
    theoryMarkdown: `
## 01 Why Modes?

Modes are **context multipliers**. They decouple the *meaning* (e.g., \`color.surface.default\`) from the *environment* (Light/Dark). 

Figma variables represent a paradigm shift: they are Figma-native design tokens.

## 02 Why Density and Viewport Modes?

*Because responsive design isn't just stretching boxes.* It's changing the mathematical relationships of space.

A Density mode (Compact vs. Comfortable) allows you to maintain one single collection and zero duplicated components. You toggle the mode, and the underlying variables resolve dynamically based on that context.
`,
    resources: [
      { title: "Guide to variables in Figma", description: "Figma Help Center's official documentation.", url: "https://help.figma.com", icon: "article" },
      { title: "Practical Variables Writing", description: "Christine Vallaure's deep dives on variable setups.", url: "https://christinevallaure.substack.com", icon: "article" }
    ]
  },
  { 
    id: 'level-3', index: 3, title: 'Component & Layout Architecture', rank: 'Component Architect', description: 'Layout primitives and compound components.', icon: '🧱',
    theoryMarkdown: `
## 01 Why Layout Primitives?

**Composition over Configuration.** If you don't provide a \`Stack\` or \`Box\` layout component, designers will invent custom margins everywhere, defeating the system entirely.

## 02 The Component API

A component is fundamentally an API. Its variants and properties are its signature.

## 03 Compound Components

*Why separate parent and child?* Because boolean sprawl (\`hasIcon\`, \`hasAvatar\`, \`hasBadge\`) creates unmaintainable mega-components. Slot architectures (like Select/Dropdown or Accordions) are the solution.
`,
    resources: [
      { title: "Component properties & variants", description: "Figma Help Center guide to building APIs.", url: "https://help.figma.com", icon: "article" },
      { title: "Component Specifications", description: "Nathan Curtis on documenting components.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-4', index: 4, title: 'The Pipeline & Automation', rank: 'Pipeline Engineer', description: 'CI/CD and single source of truth.', icon: '🔄',
    requiresRepl: true,
    replType: 'css',
    theoryMarkdown: `
## 01 Why automate?

**Drift is inevitable without enforcement.** Human discipline doesn't scale. If design tokens aren't treated like code pipelines, they will diverge.

## 02 Token CI/CD

*Why CI/CD for design?* To bridge the gap between design and DevOps. A change in Figma should trigger a GitHub Action, which runs a tool like Style Dictionary, which outputs CSS.

The \`tokens.json\` file is your actual product. Everything else is merely a build artifact derived from that single source of truth.
`,
    resources: [
      { title: "Style Dictionary Documentation", description: "The industry standard tool for token transformation.", url: "https://styledictionary.com", icon: "book" },
      { title: "A Design Tokens Workflow", description: "Stuart Robson's deep dive into token pipelines.", url: "https://www.alwaystwisted.com/articles/a-design-tokens-workflow-part-1.html", icon: "article" }
    ]
  },
  { 
    id: 'level-5', index: 5, title: 'Code, Storybook, & AI Scaffolding', rank: 'Storybook Keeper', description: 'Coded components and visual regression testing.', icon: '💻',
    theoryMarkdown: `
## 01 Why scaffold with AI?

AI is an accelerator, not a creator. A design system is highly patterned; patterned work is what AI is best at. We use agents here to generate the boilerplate React code from our JSON definitions.

## 02 Why Visual Regression?

Humans are fundamentally bad at spotting a 2px padding shift across 100 components during a code review. You cannot ship breaking changes confidently without automated eyes (like Chromatic).

## 03 The other projection

The coded library is the *other projection* of the same system. Parity is the goal.
`,
    resources: [
      { title: "Radix Primitives", description: "Unstyled, accessible components for building high-quality systems.", url: "https://www.radix-ui.com/primitives", icon: "article" },
      { title: "shadcn/ui Architecture", description: "Understanding the 'own your component source' model.", url: "https://ui.shadcn.com", icon: "book" }
    ]
  },
  { 
    id: 'level-6', index: 6, title: 'Documentation & Friction', rank: 'Docwright', description: 'Interactive playgrounds and the stranger test.', icon: '📖',
    theoryMarkdown: `
## 01 Why Interactive Playgrounds?

Adoption is inversely proportional to friction. If an engineer can't copy-paste working code instantly, they will build it themselves. Docs are a product; engineers are the users.

## 02 Documenting decisions

Document decisions, not just usage. The "why" behind a token is what future-you (and AI agents) need.

## 03 The Stranger Test

If you hand your docs to a new hire with zero context, can they successfully assemble a layout without asking you a single question? Every time they ask for clarification, you have a bug in your documentation.
`,
    resources: [
      { title: "Shopify Polaris Docs", description: "The gold standard for comprehensive system documentation.", url: "https://polaris.shopify.com", icon: "book" },
      { title: "Nathan Curtis on Documentation", description: "Essays on structuring system docs effectively.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-7', index: 7, title: 'Governance & Metrics', rank: 'Governor', description: 'Tracking metrics, deprecation, and semver.', icon: '🏛️',
    theoryMarkdown: `
## 01 Why Metrics?

You cannot govern what you cannot measure. Without usage data (detachment rates in Figma, codebase adoption via AST scanning), deprecations are guesswork.

## 02 Social failure

Systems almost always fail socially before they fail technically. Generating CSS from JSON is solved; convincing 50 independent product teams to adopt that CSS is the actual hard part.

## 03 Semantic versioning for design

When a system scales, changes cannot be reckless. We apply Semver to design. Breaking changes require extreme discipline: deprecation windows, detailed changelogs, and migration guides.
`,
    resources: [
      { title: "Team Models for Scaling a Design System", description: "Nathan Curtis on organizational structures.", url: "https://medium.com/@nathanacurtis", icon: "article" }
    ]
  },
  { 
    id: 'level-8', index: 8, title: 'The AI Layer: Context Engineering', rank: 'Agent Whisperer', description: 'Figma MCP, Code Connect, and making systems machine-readable.', icon: '🤖',
    theoryMarkdown: `
## 01 Why Context Engineering?

LLMs hallucinate UI unless constrained. An AI agent is like an enthusiastic junior designer with amnesia. You must provide a strict, machine-readable vocabulary (\`CLAUDE.md\`, Code Connect) to force it to stay on-system.

## 02 The Context Failure

When an agent hallucinates a Tailwind class, it is rarely a model failure—it is a context failure.

## 03 The Figma MCP

With the advent of the Figma Model Context Protocol (MCP) server, agents can extract variables, components, and layout topology directly from your live Figma files.
`,
    resources: [
      { title: "Figma MCP Server Docs", description: "Connect Claude to your Figma canvas.", url: "https://developers.figma.com/docs/figma-mcp-server/", icon: "article" },
      { title: "Code Connect Quickstart", description: "Map Figma components directly to your codebase.", url: "https://developers.figma.com/docs/code-connect/", icon: "book" }
    ]
  },
  { 
    id: 'level-9', index: 9, title: 'Final Boss', rank: 'System Architect', description: 'Ship the system and the capstone case study.', icon: '👑',
    theoryMarkdown: `
## 01 The terminal artifact

Your journey culminates in the assembly of the terminal artifact—a complete, functional, and governed mini design system.

The final deliverable consists of four pillars:
1. **The Repository**: The tokens.json, GitHub Action build, Chromatic tests, components, deployed Storybook, and AI context rules (\`CLAUDE.md\`).
2. **The Figma Library**: A published library utilizing variables, modes, and fully documented APIs.
3. **The Case Study**: A concise, powerful write-up.
4. **The Demo**: A highly polished screen recording proving the system works end-to-end.

> Prove it. Change a token in Figma, watch it propagate automatically to the code, prompt an AI agent, and generate a pristine, on-system UI.
`,
    resources: []
  }
];

export interface LevelMetadata {
  id: string;
  index: number;
  title: string;
  rank: string;
  description: string;
  icon: string;
}

export const LEVELS: LevelMetadata[] = [
  { id: 'level-0', index: 0, title: 'Prologue: Why Systems Exist', rank: 'Déjà-Vu Hunter', description: 'The fundamentals and cost of inconsistency.', icon: '🗺️' },
  { id: 'level-1', index: 1, title: 'Tokens from First Principles', rank: 'Token Smith', description: 'Primitive, semantic, and component token tiers.', icon: '🪙' },
  { id: 'level-2', index: 2, title: 'Figma Variables & Modes', rank: 'Variable Wrangler', description: 'Mapping tokens to Figma variables and modes.', icon: '🎛️' },
  { id: 'level-3', index: 3, title: 'Component Architecture', rank: 'Component Architect', description: 'Designing component APIs and state layers.', icon: '🧱' },
  { id: 'level-4', index: 4, title: 'The Pipeline', rank: 'Pipeline Engineer', description: 'Single source of truth via Style Dictionary.', icon: '🔄' },
  { id: 'level-5', index: 5, title: 'Components in Code', rank: 'Storybook Keeper', description: 'React, Storybook, and component parity.', icon: '💻' },
  { id: 'level-6', index: 6, title: 'Documentation', rank: 'Docwright', description: 'Writing docs for a zero-context stranger.', icon: '📖' },
  { id: 'level-7', index: 7, title: 'Governance', rank: 'Governor', description: 'Versioning, deprecation, and shipping breaking changes.', icon: '🏛️' },
  { id: 'level-8', index: 8, title: 'The AI Layer', rank: 'Agent Whisperer', description: 'Making the system machine-readable.', icon: '🤖' },
  { id: 'level-9', index: 9, title: 'Final Boss', rank: 'System Architect', description: 'Ship the system and the capstone case study.', icon: '👑' },
];

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const RANKS = [
  'Déjà-Vu Hunter',
  'Token Smith',
  'Variable Wrangler',
  'Component Architect',
  'Pipeline Engineer',
  'Storybook Keeper',
  'Docwright',
  'Governor',
  'Agent Whisperer',
  'System Architect',
];

interface GameState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  unlockedLevels: number;
  completedNodes: Record<string, boolean>; // e.g., 'level-0-theory': true
  addXp: (amount: number) => void;
  updateStreak: () => void;
  unlockLevel: (levelIndex: number) => void;
  markNodeCompleted: (nodeId: string) => void;
  getRank: () => string;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      unlockedLevels: 0, // 0 means only level 0 is unlocked
      completedNodes: {},

      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        
        if (state.lastActiveDate === today) return; // Already active today
        
        if (!state.lastActiveDate) {
          set({ streak: 1, lastActiveDate: today });
          return;
        }

        const lastDate = new Date(state.lastActiveDate);
        const currentDate = new Date(today);
        const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          set({ streak: state.streak + 1, lastActiveDate: today });
        } else {
          set({ streak: 1, lastActiveDate: today });
        }
      },

      unlockLevel: (levelIndex) => set((state) => ({ 
        unlockedLevels: Math.max(state.unlockedLevels, levelIndex) 
      })),

      markNodeCompleted: (nodeId) => set((state) => ({
        completedNodes: { ...state.completedNodes, [nodeId]: true }
      })),

      getRank: () => {
        const { unlockedLevels } = get();
        return RANKS[Math.min(unlockedLevels, RANKS.length - 1)];
      }
    }),
    {
      name: 'ds-quest-storage',
    }
  )
);

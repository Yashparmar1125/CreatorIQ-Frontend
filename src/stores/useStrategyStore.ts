import { create } from 'zustand';

interface StrategyState {
  brief: any | null;
  isLoading: boolean;
  generateBrief: (topic: string) => Promise<void>;
}

export const useStrategyStore = create<StrategyState>((set) => ({
  brief: null,
  isLoading: false,
  generateBrief: async (topic: string) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 2000));
    set({ 
      brief: {
        topic,
        titles: ['Viral React Hooks', 'Stop Using UseEffect', 'React 19 is Here'],
        structure: 'Intro, Hook, Body, Outro'
      },
      isLoading: false 
    });
  },
}));

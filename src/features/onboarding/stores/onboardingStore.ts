import { create } from 'zustand';

interface OnboardingState {
  step: number;
  niche: string[];
  format: 'long' | 'shorts' | 'both' | null;
  frequency: string | null;
  tone: string | null;
  isYoutubeConnected: boolean;
  
  nextStep: () => void;
  prevStep: () => void;
  setNiche: (niche: string[]) => void;
  setFormat: (format: 'long' | 'shorts' | 'both') => void;
  setFrequency: (frequency: string) => void;
  setTone: (tone: string) => void;
  setYoutubeConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  niche: [],
  format: null,
  frequency: null,
  tone: null,
  isYoutubeConnected: false,

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  setNiche: (niche) => set({ niche }),
  setFormat: (format) => set({ format }),
  setFrequency: (frequency) => set({ frequency }),
  setTone: (tone) => set({ tone }),
  setYoutubeConnected: (isYoutubeConnected) => set({ isYoutubeConnected }),
  reset: () => set({ step: 1, niche: [], format: null, frequency: null, tone: null, isYoutubeConnected: false }),
}));

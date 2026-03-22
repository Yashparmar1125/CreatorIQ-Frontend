import { create } from 'zustand';

interface AnalyticsState {
  retentionData: any;
  isLoading: boolean;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  retentionData: null,
  isLoading: false,
  fetchAnalytics: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 1200));
    set({ 
      retentionData: {
        intro: 88,
        value: 72,
        outro: 45
      },
      isLoading: false 
    });
  },
}));

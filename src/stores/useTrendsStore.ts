import { create } from 'zustand';
import { MOCK_TRENDS } from '../lib/mock-data';

interface TrendsState {
  trends: typeof MOCK_TRENDS;
  isLoading: boolean;
  error: string | null;
  fetchTrends: () => Promise<void>;
}

export const useTrendsStore = create<TrendsState>((set) => ({
  trends: [],
  isLoading: false,
  error: null,
  fetchTrends: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 600));
    set({ trends: MOCK_TRENDS, isLoading: false });
  },
}));

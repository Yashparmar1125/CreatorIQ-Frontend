import { create } from 'zustand';
import { MOCK_DASHBOARD_STATS, MOCK_INSIGHTS } from '../lib/mock-data';

interface DashboardState {
  stats: typeof MOCK_DASHBOARD_STATS;
  insights: typeof MOCK_INSIGHTS;
  isLoading: boolean;
  error: string | null;
  fetchDashboard: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: [],
  insights: [],
  isLoading: false,
  error: null,
  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulating Axios call
      // const response = await api.get('/dashboard');
      // set({ stats: response.data.stats, insights: response.data.insights });
      
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network lag
      set({ stats: MOCK_DASHBOARD_STATS, insights: MOCK_INSIGHTS, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

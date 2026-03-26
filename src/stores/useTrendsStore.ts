import { create } from 'zustand';
import axios from 'axios';
import { MOCK_TRENDS } from '../lib/mock-data';
import { fetchUsernameInsights, type TrendCard, type UsernameInsightsResponse } from '../lib/api';

const HISTORY_STORAGE_KEY = 'creatoriq_trends_history_v1';

export interface TrendsHistoryItem {
  id: string;
  requestedAt: string;
  username: string;
  channelTitle: string;
  detectedGenre: string;
  seedTopics: string[];
  trends: TrendCard[];
  llmResponse: UsernameInsightsResponse['llm'] | null;
  error: string | null;
}

const getStoredHistory = (): TrendsHistoryItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as TrendsHistoryItem[] : [];
  } catch {
    return [];
  }
};

const saveHistory = (history: TrendsHistoryItem[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 20)));
};

const toFallbackCards = (topics: string[]): TrendCard[] =>
  topics.slice(0, 5).map((topic, index) => ({
    title: topic,
    volume: 'N/A',
    velocity: `+${25 + (index * 5)}%`,
    tags: ['Trend'],
  }));

interface TrendsState {
  trends: TrendCard[];
  username: string;
  detectedGenre: string;
  channelTitle: string;
  seedTopics: string[];
  llmResponse: UsernameInsightsResponse['llm'] | null;
  history: TrendsHistoryItem[];
  isLoading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  fetchTrends: (usernameOverride?: string) => Promise<void>;
  clearHistory: () => void;
}

export const useTrendsStore = create<TrendsState>((set) => ({
  trends: [],
  username: 'MrBeast',
  detectedGenre: '',
  channelTitle: '',
  seedTopics: [],
  llmResponse: null,
  history: getStoredHistory(),
  isLoading: false,
  error: null,
  setUsername: (username: string) => set({ username }),
  fetchTrends: async (usernameOverride?: string) => {
    const activeUsername = (usernameOverride ?? '').trim() || 'MrBeast';
    set({ isLoading: true, error: null });

    try {
      const data = await fetchUsernameInsights(activeUsername);
      const cards = data.cards?.length > 0 ? data.cards : toFallbackCards(data.seed_topics ?? []);
      const historyItem: TrendsHistoryItem = {
        id: crypto.randomUUID(),
        requestedAt: new Date().toISOString(),
        username: activeUsername,
        channelTitle: data.channel_title ?? '',
        detectedGenre: data.genre ?? '',
        seedTopics: data.seed_topics ?? [],
        trends: cards,
        llmResponse: data.llm ?? null,
        error: data.llm?.llm_error ?? null,
      };

      set((state) => {
        const nextHistory = [historyItem, ...state.history].slice(0, 20);
        saveHistory(nextHistory);

        return {
          trends: cards,
          username: activeUsername,
          detectedGenre: data.genre ?? '',
          channelTitle: data.channel_title ?? '',
          seedTopics: data.seed_topics ?? [],
          llmResponse: data.llm ?? null,
          history: nextHistory,
          isLoading: false,
          error: data.llm?.llm_error ?? null,
        };
      });
    } catch (error) {
      const fallbackError = 'Live insights unavailable. Showing fallback trends.';
      const detailedError = axios.isAxiosError(error)
        ? (typeof error.response?.data?.detail === 'string' ? error.response.data.detail : error.message)
        : fallbackError;

      const historyItem: TrendsHistoryItem = {
        id: crypto.randomUUID(),
        requestedAt: new Date().toISOString(),
        username: activeUsername,
        channelTitle: '',
        detectedGenre: '',
        seedTopics: [],
        trends: MOCK_TRENDS,
        llmResponse: null,
        error: detailedError || fallbackError,
      };

      set((state) => {
        const nextHistory = [historyItem, ...state.history].slice(0, 20);
        saveHistory(nextHistory);

        return {
          trends: MOCK_TRENDS,
          username: activeUsername,
          detectedGenre: '',
          channelTitle: '',
          seedTopics: [],
          llmResponse: null,
          history: nextHistory,
          isLoading: false,
          error: detailedError || fallbackError,
        };
      });
    }
  },
  clearHistory: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
    set({ history: [] });
  },
}));

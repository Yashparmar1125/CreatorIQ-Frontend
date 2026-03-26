import axios from 'axios';

export interface TrendCard {
  title: string;
  volume: string;
  velocity: string;
  tags: string[];
}

export interface GenreInsightsResponse {
  genre: string;
  seed_topics: string[];
  cards: TrendCard[];
}

export interface UsernameInsightsResponse {
  username: string;
  channel_id: string;
  channel_title: string;
  genre: string;
  genre_signals: string[];
  seed_topics: string[];
  cards: TrendCard[];
  llm?: {
    cards?: TrendCard[];
    final_recommended_topics?: Array<{
      title: string;
      predicted_virality_score: number;
      time_to_trend_days: number;
      confidence_level: string;
      explanation?: {
        trends_weight_percent?: number;
        genre_weight_percent?: number;
        hidden_layer_influence?: string[];
        trigger_factors?: string[];
      };
    }>;
    hidden_layer_insights?: string[];
    rejected_candidates?: Array<{ title: string; reason: string }>;
    strategic_insights?: {
      emerging_pattern?: string;
      focus_next_7_days?: string;
    };
    llm_error?: string | null;
  };
}

// Professional API client with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for mock data simulation or auth tokens
api.interceptors.request.use((config) => {
  // In a real app, inject JWT here
  // const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchGenreInsights = async (genre: string): Promise<GenreInsightsResponse> => {
  const response = await api.get<GenreInsightsResponse>('/trends/genre-insights', {
    params: { genre },
  });
  return response.data;
};

export const fetchUsernameInsights = async (username: string): Promise<UsernameInsightsResponse> => {
  const response = await api.get<UsernameInsightsResponse>('/trends/username-insights', {
    params: { username },
  });
  return response.data;
};

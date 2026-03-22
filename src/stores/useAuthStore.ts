import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email) => {
        set({ isLoading: true });
        await new Promise(r => setTimeout(r, 1200));
        set({ 
          user: { 
            id: '1', 
            name: 'Yash', 
            email, 
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('Yash')}&background=4f46e5&color=fff` 
          }, 
          isAuthenticated: true,
          isLoading: false 
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('creatoriq-auth-storage');
      },
    }),
    {
      name: 'creatoriq-auth-storage',
    }
  )
);

import { create } from 'zustand';

interface AuthUser {
  token: string;
}

interface AuthStore {
  isLoggedIn: boolean;
  user: AuthUser | null;
  userId: string;

  login: (user: AuthUser) => void;
  logout: () => void;
  setUserId: (userId: string) => void; 
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  userId: "",

  login: (user: AuthUser) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setUserId: (userId: string) => set({ userId }),
}));

export default useAuthStore;

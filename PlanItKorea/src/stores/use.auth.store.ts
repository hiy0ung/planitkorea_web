import React from 'react'
import { create } from 'zustand';

interface AuthUser {
  id: string;
  password: string;
}

interface AuthState {
  user: AuthUser;
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: { id: '', password: ''},
  isLoggedIn: false,
  login: (user: AuthUser) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: { id: '', password: ''}, isLoggedIn: false }),
}));

export default useAuthStore;
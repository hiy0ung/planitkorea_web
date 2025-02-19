import React from 'react'
import { create } from 'zustand';

interface AuthUser {
  token: string;
}

interface AuthStore {
  isLoggedIn: boolean;
  user: AuthUser | null;

  login: (user: AuthUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (user: AuthUser) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));

//! 기존 로직
// interface AuthUser {
//   id: string;
//   password: string;
// }

// interface AuthState {
//   user: AuthUser;
//   isLoggedIn: boolean;
//   login: (user: AuthUser) => void;
//   logout: () => void;
// }

// const useAuthStore = create<AuthState>((set) => ({
//   user: { id: '', password: ''},
//   isLoggedIn: false,
//   login: (user: AuthUser) => set({ user, isLoggedIn: true }),
//   logout: () => set({ user: { id: '', password: ''}, isLoggedIn: false }),
// }));

export default useAuthStore;
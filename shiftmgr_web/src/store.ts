import { create } from 'zustand';

export type Role = 'staff' | 'manager' | 'admin';
export type User = { id: number; email: string; role: Role } | null;

export const useSession = create<{ user: User; setUser: (u: User) => void }>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

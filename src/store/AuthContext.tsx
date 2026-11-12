import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../lib/hooks';

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  balance: number;
  bonuses: number;
}

interface AuthContextValue {
  user: User | null;
  /** Demo only: any credentials work, admin@… gets the admin role. */
  login: (email: string, _password: string) => void;
  register: (name: string, email: string, _password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const makeUser = (name: string, email: string): User => ({
  name,
  email,
  isAdmin: email.trim().toLowerCase().startsWith('admin@'),
  balance: 12400,
  bonuses: 860,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('pg-user', null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email) =>
        setUser(makeUser(email.split('@')[0] || 'Guest', email)),
      register: (name, email) => setUser(makeUser(name || 'Guest', email)),
      logout: () => setUser(null),
    }),
    [user, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

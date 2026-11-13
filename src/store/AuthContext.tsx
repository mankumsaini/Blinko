import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function createMockUser(email: string, name?: string): User {
  const derivedName = name || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    id: 'u1',
    name: derivedName,
    email,
    phone: '9876543210',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    addresses: [
      {
        id: 'addr1',
        type: 'home',
        line1: '123 MG Road',
        line2: 'Near Lalbagh',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        isDefault: true,
      },
    ],
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({ user: null, isLoggedIn: false });

  const login = async (email: string, _password: string): Promise<void> => {
    // Mock login — no real auth
    const user = createMockUser(email);
    setState({ user, isLoggedIn: true });
  };

  const logout = () => {
    setState({ user: null, isLoggedIn: false });
  };

  const register = async (name: string, email: string, _password: string): Promise<void> => {
    const user = createMockUser(email, name);
    setState({ user, isLoggedIn: true });
  };

  const updateProfile = (data: Partial<User>) => {
    if (!state.user) return;
    setState((prev) => ({ ...prev, user: { ...prev.user!, ...data } }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

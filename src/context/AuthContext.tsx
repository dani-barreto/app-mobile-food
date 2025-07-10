// AuthContext.tsx - criado automaticamente
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';

interface AuthContextData {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (user: Omit<User, 'senha'> & { senha: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const STORAGE_KEY = '@authenticatedUser';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const usersJSON = await AsyncStorage.getItem('@RestauranteApp:usuarios');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (found) {
        setUser(found);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'senha'> & { senha: string }): Promise<boolean> => {
    try {
      const usersJSON = await AsyncStorage.getItem('@RestauranteApp:usuarios');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

      const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) return false;

      const newUser: User = { ...userData };
      users.push(newUser);

      await AsyncStorage.setItem('@RestauranteApp:usuarios', JSON.stringify(users));
      setUser(newUser);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
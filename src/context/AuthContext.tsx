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

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const usersJSON = await AsyncStorage.getItem('@iec-food:usuarios');
      if (!usersJSON) {
        const defaultUser = { nome: 'Cliente Padrão', email: 'cliente', senha: 'cliente' };
        await AsyncStorage.setItem('@iec-food:usuarios', JSON.stringify([defaultUser]));
        console.log("Usuário padrão 'cliente'/'cliente' criado com sucesso!");
      }

      const savedUser = await AsyncStorage.getItem('@iec-food:user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    // ✅ DEPURANDO AQUI DENTRO
    try {
      console.log('--- DENTRO DA FUNÇÃO LOGIN ---');
      console.log(`Comparando: Email digitado [${email}] | Senha digitada [${senha}]`);

      const usersJSON = await AsyncStorage.getItem('@iec-food:usuarios');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

      console.log('Usuários salvos no dispositivo:', users);

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );
      
      console.log('Resultado da busca (encontrou?):', found ? found : 'Não encontrou');
      console.log('-----------------------------');

      if (found) {
        setUser(found);
        await AsyncStorage.setItem('@iec-food:user', JSON.stringify(found));
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
      const usersJSON = await AsyncStorage.getItem('@iec-food:usuarios');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
      const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) return false;
      const newUser: User = { ...userData };
      users.push(newUser);
      await AsyncStorage.setItem('@iec-food:usuarios', JSON.stringify(users));
      setUser(newUser);
      await AsyncStorage.setItem('@iec-food:user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('@iec-food:user');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

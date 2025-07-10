import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Restaurante } from '../types/restaurante';

interface RestauranteContextType {
  restaurantes: Restaurante[];
  getRestauranteById: (id: string) => Restaurante | undefined;
  setRestaurantes: (restaurantes: Restaurante[]) => Promise<void>;
  resetContext: () => Promise<void>; // Adicionado
}

const STORAGE_KEY = '@restaurantes';

const initialRestaurants: Restaurante[] = [

];

const RestauranteContext = createContext<RestauranteContextType | undefined>(undefined);

export const RestauranteProvider = ({ children }: { children: ReactNode }) => {
  const [restaurantes, setRestaurantesState] = useState<Restaurante[]>([]);

  useEffect(() => {
    const loadRestaurantes = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRestaurantesState(JSON.parse(stored));
      } else {
        setRestaurantesState(initialRestaurants);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialRestaurants));
      }
    };
    loadRestaurantes();
  }, []);

  const setRestaurantes = async (restaurantes: Restaurante[]) => {
    setRestaurantesState(restaurantes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurantes));
  };

  const getRestauranteById = (id: string) => restaurantes.find(r => r.id === id);

  const resetContext = async () => {
    setRestaurantesState(initialRestaurants);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialRestaurants));
  };

  return (
    <RestauranteContext.Provider value={{ restaurantes, getRestauranteById, setRestaurantes, resetContext }}>
      {children}
    </RestauranteContext.Provider>
  );
};

export const useRestauranteContext = () => {
  const context = useContext(RestauranteContext);
  if (!context) {
    throw new Error('useRestauranteContext deve ser usado dentro de um RestauranteProvider');
  }
  return context;
};
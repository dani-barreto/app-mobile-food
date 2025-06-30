// index.tsx - criado automaticamente
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import { AppStackParamList, AuthStackParamList } from '../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export function Routes() {
    const { isAuthenticated, loading } = useAuth();

  // Mostra loader enquanto verifica autenticação
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }
  return (
    <>
      {isAuthenticated ? (
        <AppStack.Navigator id={undefined} >
          <AppStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Cardápio', headerTitleAlign: 'center' }} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator id={undefined}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </>
  );
}
 
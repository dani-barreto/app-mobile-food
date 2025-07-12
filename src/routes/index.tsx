// index.tsx - criado automaticamente
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import { AppStackParamList, AuthStackParamList } from '../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export function Routes() {
    const { isAuthenticated, loading, user, logout } = useAuth();

  if (loading) {
    return <Splash />;
  }
  return (
    <>
      {isAuthenticated ? (
        <AppStack.Navigator>
          <AppStack.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              title: user?.nome, 
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity onPress={logout} style={{ marginRight: 10 }}>
                  <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>Sair</Text>
                </TouchableOpacity>
              ),
            }} 
          />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      )}
    </>
  );
}
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{title: 'Cardápio', headerTitleAlign: 'center' }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
   
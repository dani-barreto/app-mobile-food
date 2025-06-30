import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { splash_styles } from '../styles/splash_styles'; // Verifique se o caminho do estilo está correto

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 2000);
  }, []);

  return (
    <View style={splash_styles.container}>
      <Image source={require('../assets/images/logo-food.png')} style={splash_styles.logo} />
      <Text style={splash_styles.title}>Bem-vindo ao IEC Food</Text>
    </View>
  );
}
import { useAuth } from '@/src/context/AuthContext';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const SplashScreen = ({ navigation }: any) => {

   const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-food.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao IEC Food</Text>
    </View>
  );
}

export default  SplashScreen;
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-food.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo ao IEC Food</Text>
    </View>
  );
}

export default  SplashScreen;
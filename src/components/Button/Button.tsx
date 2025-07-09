import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './style';

type Props = {
  title: string;
  type?: 'black' | 'white';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ThemeButton: React.FC<Props> = ({ title, type = 'black', onPress, style }) => {
  const buttonStyle = type === 'black' ? styles.ButtomBlack : styles.ButtomWhite;
  const textStyle = type === 'black' ? styles.ButtomTitleBlack : styles.ButtomTitleWhite;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './style';

type Props = {
  title?: string;
  type?: 'black' | 'white';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  sizeIcon?: number;
};

export const ThemeButton: React.FC<Props> = ({ title, type = 'black', onPress, style, icon, sizeIcon = 24 }) => {
  const buttonStyle = type === 'black' ? styles.ButtomBlack : styles.ButtomWhite;
  const textStyle = type === 'black' ? styles.ButtomTitleBlack : styles.ButtomTitleWhite;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={sizeIcon} color="#fff" />}
       {title && <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};
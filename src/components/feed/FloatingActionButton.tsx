import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/FeedScreen.styles';

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity 
      style={[styles.fab, { backgroundColor: colors.accent }]}
      onPress={onPress}
    >
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
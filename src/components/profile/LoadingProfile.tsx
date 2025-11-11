import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/ProfileScreen.styles';

const LoadingProfile: React.FC = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.loadingContainer, { backgroundColor: colors.bgPrimary }]}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={[styles.loadingText, { color: colors.textMuted }]}>
        Loading Profile...
      </Text>
    </View>
  );
};

export default LoadingProfile;
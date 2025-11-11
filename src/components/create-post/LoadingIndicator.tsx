import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

interface LoadingIndicatorProps {
  loading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loading }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  if (!loading) return null;

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={[styles.loadingText, { color: colors.textMuted }]}>
        Creating your post...
      </Text>
    </View>
  );
};

export default LoadingIndicator;
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/ProfileScreen.styles';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.bgSecondary }]}>
        <Text style={styles.emptyIconText}>{icon}</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
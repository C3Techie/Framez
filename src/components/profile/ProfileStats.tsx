import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { ProfileStats as ProfileStatsType } from '../../types/profile';
import styles from '../../styles/ProfileScreen.styles';

interface ProfileStatsProps {
  stats: ProfileStatsType;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.statsContainer, { backgroundColor: colors.bgSecondary }]}>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
          {stats.posts}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Posts
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
          {stats.followers}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Followers
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
          {stats.following}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Following
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
          {stats.likes}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          Likes
        </Text>
      </View>
    </View>
  );
};

export default ProfileStats;
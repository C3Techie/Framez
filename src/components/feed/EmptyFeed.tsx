import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/FeedScreen.styles';

interface EmptyFeedProps {
  onCreatePost: () => void;
}

const EmptyFeed: React.FC<EmptyFeedProps> = ({ onCreatePost }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
      <View style={styles.emptyContainer}>
        <View style={[styles.logoCircle]}>
          <Image 
            source={require('../../assets/framez.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
        No posts yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
        Be the first to share a moment with the community
      </Text>
      <TouchableOpacity 
        style={[styles.emptyButton, { backgroundColor: colors.accent }]}
        onPress={onCreatePost}
      >
        <Text style={styles.emptyButtonText}>
          Create First Post
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyFeed;
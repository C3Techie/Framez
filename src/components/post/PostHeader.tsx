import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { formatPostDate } from '../../utils/dateUtils';
import styles from '../../styles/PostCard.styles';

interface PostHeaderProps {
  authorEmail: string;
  timestamp: { seconds: number, nanoseconds: number } | null;
  isOwnPost: boolean;
  onMenuPress: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  authorEmail,
  timestamp,
  isOwnPost,
  onMenuPress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const timeAgo = formatPostDate(timestamp);

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <View style={styles.userInfo}>
        <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
          <Text style={styles.avatarText}>
            {authorEmail?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={[styles.username, { color: colors.textPrimary }]}>
            {authorEmail}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textMuted }]}>
            {timeAgo}
          </Text>
        </View>
      </View>

      {isOwnPost && (
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 18 }}>⋯</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostHeader;
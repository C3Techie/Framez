import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { formatPostDate } from '../../utils/dateUtils';
import styles from '../../styles/PostCard.styles';

interface PostHeaderProps {
  authorUsername: string;
  timestamp: { seconds: number, nanoseconds: number } | null;
  isOwnPost: boolean;
  onMenuPress: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  authorUsername,
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
        <View style={[styles.logoCircle]}>
          <Image
            source={require('../../assets/framez.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={[styles.username, { color: colors.textPrimary }]}>
            {authorUsername}
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
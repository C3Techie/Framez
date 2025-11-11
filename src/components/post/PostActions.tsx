import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import Icon from '../common/Icon';
import styles from '../../styles/PostCard.styles';

interface PostActionsProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLikePress: () => void;
  onCommentPress: () => void;
  onSharePress: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  likeCount,
  commentCount,
  onLikePress,
  onCommentPress,
  onSharePress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.actions, { borderTopColor: colors.border }]}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onLikePress}
      >
        <Icon 
          name="like" 
          size={20} 
          color={isLiked ? colors.like : colors.textMuted}
        />
        <Text style={[styles.actionText, { color: colors.textMuted }]}>
          {likeCount}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onCommentPress}
      >
        <Icon name="comment" size={20} color={colors.textMuted} />
        <Text style={[styles.actionText, { color: colors.textMuted }]}>
          {commentCount}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
        <Icon name="share" size={20} color={colors.textMuted} />
        <Text style={[styles.actionText, { color: colors.textMuted }]}>
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostActions;
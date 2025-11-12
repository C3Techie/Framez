import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput 
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import { useAuthorUsername } from '../hooks/useAuthorUsername';
import { usePostActions } from '../hooks/usePostActions';
import { useComments } from '../hooks/useComments';
import { formatPostDate } from '../utils/dateUtils';
import styles from '../styles/PostCard.styles';

interface Post {
  id: string;
  authorId: string;
  authorUsername: string;
  caption: string;
  imageUrl: string | null;
  timestamp: { seconds: number, nanoseconds: number } | null;
  likes?: string[];
  comments?: any[];
}

interface PostCardProps {
  post: Post;
  onUpdate?: () => void;
}

const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const { user } = useAuth();
  const { theme, isDark } = useTheme();
  const colors = Colors[theme];
  const { username, loading } = useAuthorUsername(post.authorId);
  
  console.log('PostCard Debug:', { 
    authorId: post.authorId, 
    username, 
    loading,
    authorUsername: post.authorUsername 
  });
  
  // Use custom hooks for post actions and comments
  const {
    isEditing,
    setIsEditing,
    editedCaption,
    setEditedCaption,
    isLiked,
    likeCount,
    isOwnPost,
    handleLike,
    handleEdit,
    handleDelete,
  } = usePostActions(post, onUpdate);

  const {
    showComments,
    setShowComments,
    newComment,
    setNewComment,
    addComment,
  } = useComments(post, onUpdate);
  
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const timeAgo = formatPostDate(post.timestamp);

  return (
    <View style={[styles.container, { backgroundColor: colors.bgCard }]}>
      {/* Header */}
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
              {username || 'Loading...'}
            </Text>
            <Text style={[styles.timestamp, { color: colors.textMuted }]}>
              {timeAgo}
            </Text>
          </View>
        </View>

        {isOwnPost && (
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Text style={{ color: colors.textPrimary, fontSize: 18 }}>⋯</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Caption */}
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[styles.editInput, { 
              color: colors.textPrimary,
              backgroundColor: colors.bgSecondary,
              borderColor: colors.border
            }]}
            value={editedCaption}
            onChangeText={setEditedCaption}
            multiline
            autoFocus
          />
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colors.bgHover }]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={{ color: colors.textPrimary }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colors.accent }]}
              onPress={handleEdit}
            >
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        post.caption && (
          <View style={styles.captionContainer}>
            <Text style={[styles.caption, { color: colors.textPrimary }]}>
              {post.caption}
            </Text>
          </View>
        )
      )}

      {/* Image */}
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Text style={[styles.actionIcon, { color: isLiked ? colors.like : colors.textMuted }]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
          <Text style={[styles.actionText, { color: colors.textMuted }]}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowComments(true)}
        >
          <Text style={[styles.actionIcon, { color: colors.textMuted }]}>
            💬
          </Text>
          <Text style={[styles.actionText, { color: colors.textMuted }]}>
            {post.comments?.length || 0}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Coming Soon', 'Share feature will be available soon!')}
        >
          <Text style={[styles.actionIcon, { color: colors.textMuted }]}>
            🔄
          </Text>
          <Text style={[styles.actionText, { color: colors.textMuted }]}>
            Share
          </Text>
        </TouchableOpacity>

        <View style={styles.timestampContainer}>
          <Text style={[styles.timestampAction, { color: colors.textMuted }]}>
            {timeAgo}
          </Text>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={[styles.menu, { backgroundColor: colors.bgCard }]}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setIsEditing(true);
                setIsMenuVisible(false);
              }}
            >
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                Edit Post
              </Text>
            </TouchableOpacity>
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleDelete}
            >
              <Text style={[styles.menuText, { color: colors.error }]}>
                Delete Post
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
      >
        <View style={[styles.commentsContainer, { backgroundColor: colors.bgPrimary }]}>
          <View style={[styles.commentsHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.commentsTitle, { color: colors.textPrimary }]}>
              Comments
            </Text>
            <TouchableOpacity 
              onPress={() => setShowComments(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: colors.textPrimary, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commentsList}>
            {(post.comments || []).map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={[styles.commentUser, { color: colors.textPrimary }]}>
                  {comment.username}
                </Text>
                <Text style={[styles.commentText, { color: colors.textSecondary }]}>
                  {comment.text}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.commentInputContainer, { borderTopColor: colors.border }]}>
            <TextInput
              style={[styles.commentInput, { 
                color: colors.textPrimary,
                backgroundColor: colors.bgSecondary
              }]}
              placeholder="Add a comment..."
              placeholderTextColor={colors.textMuted}
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity 
              style={[styles.commentButton, { backgroundColor: colors.accent }]}
              onPress={addComment}
              disabled={!newComment.trim()}
            >
              <Text style={{ color: '#fff' }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostCard;
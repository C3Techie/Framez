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
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../config/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import styles from '../styles/PostCard.styles';

interface Post {
  id: string;
  authorId: string;
  authorEmail: string;
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
  
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.uid || '') || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const postDate = post.timestamp ? new Date(post.timestamp.seconds * 1000) : new Date();
  const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });

  const isOwnPost = user?.uid === post.authorId;

  const handleLike = async () => {
    if (!user) return;

    const newLikes = isLiked 
      ? (post.likes || []).filter(id => id !== user.uid)
      : [...(post.likes || []), user.uid];

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      await updateDoc(doc(db, 'posts', post.id), {
        likes: newLikes
      });
    } catch (error) {
      // Revert on error
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleEdit = async () => {
    if (!editedCaption.trim()) return;

    try {
      await updateDoc(doc(db, 'posts', post.id), {
        caption: editedCaption
      });
      setIsEditing(false);
      setIsMenuVisible(false);
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to update post');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: confirmDelete
        }
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      // Delete image from storage if exists
      if (post.imageUrl) {
        const imageRef = ref(storage, post.imageUrl);
        await deleteObject(imageRef);
      }

      // Delete post from firestore
      await deleteDoc(doc(db, 'posts', post.id));
      setIsMenuVisible(false);
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !user) return;

    const comment = {
      id: Date.now().toString(),
      userId: user.uid,
      userEmail: user.email,
      text: newComment,
      timestamp: new Date(),
    };

    const updatedComments = [...(post.comments || []), comment];

    try {
      await updateDoc(doc(db, 'posts', post.id), {
        comments: updatedComments
      });
      setNewComment('');
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgCard }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>
              {post.authorEmail?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.username, { color: colors.textPrimary }]}>
              {post.authorEmail}
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
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionIcon, { color: colors.textMuted }]}>
            🔄
          </Text>
          <Text style={[styles.actionText, { color: colors.textMuted }]}>
            Share
          </Text>
        </TouchableOpacity>
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
                  {comment.userEmail}
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
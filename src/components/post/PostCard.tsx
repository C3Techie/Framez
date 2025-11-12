import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { usePostActions } from '../../hooks/usePostActions';
import { useComments } from '../../hooks/useComments';
import { useAuthorUsername } from '../../hooks/useAuthorUsername';
import { PostCardProps } from '../../types/post';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostMenu from './PostMenu';
import EditPost from './EditPost';
import CommentsModal from './CommentsModal';
import styles from '../../styles/PostCard.styles';

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { username } = useAuthorUsername(post.authorId);

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

  return (
    <View style={[styles.container, { backgroundColor: colors.bgCard }]}>
      {/* Header */}
      <PostHeader
        authorUsername={username}
        timestamp={post.timestamp}
        isOwnPost={isOwnPost}
        onMenuPress={() => setIsMenuVisible(true)}
      />

      {/* Content */}
      {isEditing ? (
        <EditPost
          editedCaption={editedCaption}
          onCaptionChange={setEditedCaption}
          onSave={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <PostContent
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      )}

      {/* Actions */}
      <PostActions
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={post.comments?.length || 0}
        onLikePress={handleLike}
        onCommentPress={() => setShowComments(true)}
        onSharePress={() => {/* Implement share functionality */}}
      />

      {/* Modals */}
      <PostMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onEditPress={() => setIsEditing(true)}
        onDeletePress={handleDelete}
      />

      <CommentsModal
        visible={showComments}
        comments={post.comments || []}
        newComment={newComment}
        onClose={() => setShowComments(false)}
        onCommentChange={setNewComment}
        onAddComment={addComment}
      />
    </View>
  );
};

export default PostCard;
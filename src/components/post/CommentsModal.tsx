import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { Comment } from '../../types/post';
import styles from '../../styles/PostCard.styles';

interface CommentsModalProps {
  visible: boolean;
  comments: Comment[];
  newComment: string;
  onClose: () => void;
  onCommentChange: (text: string) => void;
  onAddComment: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  visible,
  comments,
  newComment,
  onClose,
  onCommentChange,
  onAddComment,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.commentsContainer, { backgroundColor: colors.bgPrimary }]}>
        <View style={[styles.commentsHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.commentsTitle, { color: colors.textPrimary }]}>
            Comments
          </Text>
          <TouchableOpacity 
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={{ color: colors.textPrimary, fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.commentsList}>
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={[styles.commentUser, { color: colors.textPrimary }]}>
                {comment.userEmail}
              </Text>
              <Text style={[styles.commentText, { color: colors.textSecondary }]}>
                {comment.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.commentInputContainer, { borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.commentInput, { 
              color: colors.textPrimary,
              backgroundColor: colors.bgSecondary
            }]}
            placeholder="Add a comment..."
            placeholderTextColor={colors.textMuted}
            value={newComment}
            onChangeText={onCommentChange}
          />
          <TouchableOpacity 
            style={[styles.commentButton, { backgroundColor: colors.accent }]}
            onPress={onAddComment}
            disabled={!newComment.trim()}
          >
            <Text style={{ color: '#fff' }}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;
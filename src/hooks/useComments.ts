import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { Post, Comment } from '../types/post';
import { fetchUsernameFromFirestore } from '../utils/userUtils';

export const useComments = (post: Post, onUpdate?: () => void) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const addComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      // Fetch the current user's username from Firestore
      const currentUsername = await fetchUsernameFromFirestore(user.uid, user.email);

      const comment: Comment = {
        id: Date.now().toString(),
        userId: user.uid,
        username: currentUsername,
        text: newComment,
        timestamp: new Date(),
      };

      const updatedComments = [...(post.comments || []), comment];

      await updateDoc(doc(db, 'posts', post.id), {
        comments: updatedComments
      });
      setNewComment('');
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  return {
    showComments,
    setShowComments,
    newComment,
    setNewComment,
    addComment,
  };
};
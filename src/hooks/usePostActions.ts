import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../config/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Post } from '../types/post';

export const usePostActions = (post: Post, onUpdate?: () => void) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.uid || '') || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

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
      onUpdate?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  return {
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
    confirmDelete,
  };
};
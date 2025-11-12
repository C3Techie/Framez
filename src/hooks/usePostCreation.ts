import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fetchUsernameFromFirestore } from '../utils/userUtils';

export const usePostCreation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createPost = async (caption: string, imageUri: string | null): Promise<boolean> => {
    if (!caption.trim()) {
      Alert.alert('Error', 'Please enter a caption.');
      return false;
    }
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a post.');
      return false;
    }

    setLoading(true);
    
    try {
      // Fetch username from Firestore
      const authorUsername = await fetchUsernameFromFirestore(user.uid, user.email);

      // Create the post without image URL (image upload is disabled due to Firebase plan)
      const newPostRef = collection(db, 'posts');

      await addDoc(newPostRef, {
        authorId: user.uid,
        authorUsername: authorUsername,
        caption: caption.trim(),
        imageUrl: null, // Image upload is disabled
        timestamp: serverTimestamp(),
        likes: [],
        comments: [],
      });

      return true;
    } catch (error: any) {
      console.error('Post creation error:', error);
      Alert.alert('Post Failed', error.message || 'Failed to create post');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createPost,
  };
};
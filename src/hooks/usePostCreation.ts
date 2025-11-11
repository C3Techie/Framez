import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const usePostCreation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const uploadImage = async (uri: string, postId: string): Promise<string | null> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `posts/${user?.uid}/${postId}`);
      
      await uploadBytes(storageRef, blob);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const createPost = async (caption: string, imageUri: string | null): Promise<boolean> => {
    if (!caption.trim() && !imageUri) {
      Alert.alert('Error', 'Please enter a caption or select an image.');
      return false;
    }
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a post.');
      return false;
    }

    setLoading(true);
    
    // Add a timeout to prevent infinite loading
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout. Please check your connection.')), 30000);
    });
    
    try {
      await Promise.race([
        (async () => {
          // First, create the post without image URL
          const newPostRef = collection(db, 'posts');
          const newPostDoc = await addDoc(newPostRef, {
            authorId: user.uid,
            authorEmail: user.email,
            caption: caption.trim(),
            imageUrl: null,
            timestamp: serverTimestamp(),
            likes: [],
            comments: [],
          });

          let imageUrl = null;
          if (imageUri) {
            // Upload image and get URL
            imageUrl = await uploadImage(imageUri, newPostDoc.id);
            
            // Update the post with the image URL using updateDoc
            if (imageUrl) {
              await updateDoc(doc(db, 'posts', newPostDoc.id), {
                imageUrl: imageUrl,
              });
            }
          }

          Alert.alert('Success', 'Post created successfully!');
        })(),
        timeoutPromise
      ]);
      
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
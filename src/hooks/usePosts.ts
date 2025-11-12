import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Post } from '../types/post';
import { useAuth } from '../context/AuthContext';

export const usePosts = (enabled: boolean = true) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !user) {
      setPosts([]); // Clear posts if not enabled or user is logged out
      setLoading(false);
      return;
    }

    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(postsQuery,
      (snapshot) => {
        const fetchedPosts: Post[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Post));
        setPosts(fetchedPosts);
        setLoading(false);
        setError(null);
      }, 
      (error: any) => {
        console.error('Firestore Listen Error:', error);
        
        let errorMessage = 'Failed to fetch posts';
        if (error.code === 'failed-precondition') {
          errorMessage = 'Database error. Please try again.';
        } else if (error.code === 'unavailable') {
          errorMessage = 'Network unavailable. Please check your connection.';
        } else if (error.code === 'permission-denied') {
          errorMessage = 'You do not have permission to access posts.';
        } else {
          errorMessage = `Failed to fetch posts: ${error.message}`;
        }
        
        setError(errorMessage);
        setLoading(false);
        
        // Show alert for all errors except network issues (they auto-recover)
        if (error.code !== 'unavailable') {
          Alert.alert('Error', errorMessage);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [enabled, user]);

  const refetch = () => {
    if (enabled) {
      setLoading(true);
      setError(null);
    }
  };

  return {
    posts,
    loading,
    error,
    refetch,
  };
};
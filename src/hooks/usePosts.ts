import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Post } from '../types/post';

export const usePosts = (enabled: boolean = true) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.warn('Posts loading timeout - setting loading to false');
        setLoading(false);
        setError('Loading took too long. Please check your connection.');
      }
    }, 15000); // 15 seconds timeout

    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(postsQuery, 
      (snapshot) => {
        clearTimeout(loadingTimeout);
        const fetchedPosts: Post[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Post));
        setPosts(fetchedPosts);
        setLoading(false);
        setError(null);
      }, 
      (error: any) => {
        clearTimeout(loadingTimeout);
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
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, [enabled]);

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
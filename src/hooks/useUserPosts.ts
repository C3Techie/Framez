import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Post } from '../types/post';

export const useUserPosts = (enabled: boolean = true) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !user) {
      setLoading(false);
      return;
    }

    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

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
      (error) => {
        setError('Failed to fetch user posts: ' + error.message);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch user posts: ' + error.message);
      }
    );

    return unsubscribe;
  }, [user, enabled]);

  const refetch = () => {
    setLoading(true);
  };

  return {
    posts,
    loading,
    error,
    refetch,
  };
};
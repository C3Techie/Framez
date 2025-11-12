import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUsernameFromFirestore } from '../utils/userUtils';

export const useUsername = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsername = async () => {
      if (!user) {
        setUsername('');
        setLoading(false);
        return;
      }

      const fetchedUsername = await fetchUsernameFromFirestore(user.uid, user.email);
      setUsername(fetchedUsername);
      setLoading(false);
    };

    loadUsername();
  }, [user]);

  return { username, loading };
};

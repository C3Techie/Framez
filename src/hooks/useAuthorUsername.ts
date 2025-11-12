import { useState, useEffect } from 'react';
import { fetchUsernameFromFirestore } from '../utils/userUtils';

export const useAuthorUsername = (authorId: string) => {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsername = async () => {
      const fetchedUsername = await fetchUsernameFromFirestore(authorId);
      setUsername(fetchedUsername);
      setLoading(false);
    };

    loadUsername();
  }, [authorId]);

  return { username, loading };
};

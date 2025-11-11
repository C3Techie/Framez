import { useMemo } from 'react';
import { Post } from '../types/post';
import { ProfileStats } from '../types/profile';

export const useProfileStats = (posts: Post[]) => {
  const stats = useMemo((): ProfileStats => {
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
    
    return {
      posts: posts.length,
      followers: 0, // Placeholder - implement followers system later
      following: 0, // Placeholder - implement following system later
      likes: totalLikes,
    };
  }, [posts]);

  return stats;
};
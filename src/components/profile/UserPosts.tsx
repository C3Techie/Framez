import React from 'react';
import { View, FlatList } from 'react-native';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import EmptyState from './EmptyState';
import styles from '../../styles/ProfileScreen.styles';

interface UserPostsProps {
  posts: Post[];
  onPostUpdate?: () => void;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts, onPostUpdate }) => {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No posts yet"
        subtitle="Start sharing your moments with the world!"
      />
    );
  }

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} onUpdate={onPostUpdate} />}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserPosts;
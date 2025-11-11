import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { Post } from '../../types/post';
import PostCard from '../post/PostCard';
import EmptyFeed from './EmptyFeed';
import styles from '../../styles/FeedScreen.styles';

interface FeedContentProps {
  posts: Post[];
  refreshing: boolean;
  onRefresh: () => void;
  onPostUpdate: () => void;
  onCreatePost: () => void;
}

const FeedContent: React.FC<FeedContentProps> = ({
  posts,
  refreshing,
  onRefresh,
  onPostUpdate,
  onCreatePost,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: Post) => item.id}
      renderItem={({ item }: { item: Post }) => (
        <PostCard post={item} onUpdate={onPostUpdate} />
      )}
      contentContainerStyle={styles.feedContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent}
        />
      }
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyFeed onCreatePost={onCreatePost} />}
    />
  );
};

export default FeedContent;
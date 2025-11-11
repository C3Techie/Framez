import React from 'react';
import EmptyState from './EmptyState';

const SavedPosts: React.FC = () => {
  return (
    <EmptyState
      icon="💾"
      title="Feature Coming Soon"
      subtitle="Saved posts feature will be available soon. Stay tuned!"
    />
  );
};

export default SavedPosts;
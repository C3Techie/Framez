import { useState, useCallback } from 'react';

export const useRefresh = (onRefreshCallback?: () => void) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (onRefreshCallback) {
      onRefreshCallback();
    }
    // Simulate refresh completion after 1 second
    setTimeout(() => setRefreshing(false), 1000);
  }, [onRefreshCallback]);

  return {
    refreshing,
    onRefresh,
    setRefreshing,
  };
};
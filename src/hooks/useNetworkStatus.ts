import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true); // Start as connected

  useEffect(() => {
    // Simple approach - assume connected and let Firebase handle network issues
    // This avoids complex network detection but still provides the structure
    setIsConnected(true);
  }, []);

  return isConnected;
};
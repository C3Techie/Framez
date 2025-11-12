import React from 'react';
import { View, Text } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';

const NetworkStatusBar: React.FC = () => {
  const isConnected = useNetworkStatus();
  const { theme } = useTheme();
  const colors = Colors[theme];

  // For now, return null (hidden) since we're not doing real network detection
  // You can enable this later when you want to add proper network detection
  return null;

  /* Uncomment this when you want to show network status:
  if (isConnected === null) return null; // Still checking
  if (isConnected) return null; // Connected - don't show anything

  return (
    <View style={{ 
      backgroundColor: colors.error, 
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{ 
        color: '#fff', 
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500'
      }}>
        📶 No internet connection
      </Text>
    </View>
  );
  */
};

export default NetworkStatusBar;

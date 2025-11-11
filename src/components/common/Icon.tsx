import React from 'react';
import { Text, StyleSheet } from 'react-native';

export type IconName = 
  | 'sun' | 'moon' | 'settings' | 'logout' | 'bell' | 'message' 
  | 'home' | 'search' | 'plus' | 'heart' | 'profile' | 'camera'
  | 'gallery' | 'like' | 'comment' | 'share' | 'edit' | 'delete';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const iconMap: Record<IconName, string> = {
  sun: '☀️',
  moon: '🌙',
  settings: '⚙️',
  logout: '⎋',
  bell: '🔔',
  message: '✉️',
  home: '🏠',
  search: '🔍',
  plus: '➕',
  heart: '❤️',
  profile: '👤',
  camera: '📸',
  gallery: '📁',
  like: '❤️',
  comment: '💬',
  share: '🔄',
  edit: '✎',
  delete: '🗑️',
};

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor' }) => {
  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {iconMap[name]}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default Icon;
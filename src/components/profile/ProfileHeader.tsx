import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/ProfileScreen.styles';

interface ProfileHeaderProps {
  username: string;
  onSettingsPress?: () => void;
  onLogoutPress: () => void;
  onThemeToggle?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  onSettingsPress,
  onLogoutPress,
  onThemeToggle,
}) => {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      toggleTheme();
    }
  };

  const handleSettingsPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    } else {
      Alert.alert('Settings', 'Settings feature coming soon!');
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.bgSecondary }]}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {username}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleThemeToggle}>
            <Text style={[styles.iconText, { color: colors.textPrimary }]}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSettingsPress}>
            <Text style={[styles.iconText, { color: colors.textPrimary }]}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onLogoutPress}>
            <Text style={[styles.iconText, { color: colors.textPrimary }]}>⎋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
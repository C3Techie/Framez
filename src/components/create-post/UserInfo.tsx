import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

const UserInfo: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.userInfo}>
      <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
        <Text style={styles.avatarText}>
          {user?.email?.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View>
        <Text style={[styles.userEmail, { color: colors.textPrimary }]}>{user?.email}</Text>
        <Text style={[styles.privacyText, { color: colors.textMuted }]}>Public</Text>
      </View>
    </View>
  );
};

export default UserInfo;
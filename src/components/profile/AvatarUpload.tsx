import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/ProfileScreen.styles';

interface AvatarUploadProps {
  avatarUrl: string | null;
  userEmail: string;
  uploading: boolean;
  onAvatarPress: () => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  userEmail,
  uploading,
  onAvatarPress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={onAvatarPress} disabled={uploading}>
        {avatarUrl ? (
          <Image 
            source={{ uri: avatarUrl }} 
            style={styles.avatarImage}
          />
        ) : (
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>
              {userEmail?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        {uploading && (
          <View style={styles.avatarOverlay}>
            <ActivityIndicator color="#fff" />
          </View>
        )}
        <View style={[styles.editBadge, { backgroundColor: colors.accent }]}>
          <Text style={styles.editBadgeText}>✎</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarUpload;
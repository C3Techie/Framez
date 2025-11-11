import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import AvatarUpload from './AvatarUpload';
import styles from '../../styles/ProfileScreen.styles';

interface ProfileInfoProps {
  userEmail: string;
  avatarUrl: string | null;
  uploadingAvatar: boolean;
  onAvatarPress: () => void;
  onEditProfilePress?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userEmail,
  avatarUrl,
  uploadingAvatar,
  onAvatarPress,
  onEditProfilePress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleEditProfile = () => {
    if (onEditProfilePress) {
      onEditProfilePress();
    } else {
      Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
    }
  };

  const username = userEmail?.split('@')[0] || 'User';

  return (
    <View style={styles.profileSection}>
      <AvatarUpload
        avatarUrl={avatarUrl}
        userEmail={userEmail}
        uploading={uploadingAvatar}
        onAvatarPress={onAvatarPress}
      />

      <Text style={[styles.userName, { color: colors.textPrimary }]}>
        {username}
      </Text>
      <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
        {userEmail}
      </Text>

      <TouchableOpacity 
        style={[styles.editButton, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}
        onPress={handleEditProfile}
      >
        <Text style={[styles.editButtonText, { color: colors.textPrimary }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInfo;
import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { useUsername } from '../../hooks/useUsername';
import styles from '../../styles/ProfileScreen.styles';

interface ProfileInfoProps {
  userEmail: string;
  onEditProfilePress?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userEmail,
  onEditProfilePress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { username } = useUsername();

  const handleEditProfile = () => {
    if (onEditProfilePress) {
      onEditProfilePress();
    } else {
      Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
    }
  };

  return (
    <View style={styles.profileSection}>
      <View style={[styles.logoCircle]}>
        <Image
          source={require('../../assets/framez.png')}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>

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
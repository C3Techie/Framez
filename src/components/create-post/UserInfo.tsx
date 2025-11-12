import React from 'react';
import { Text, View, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { useUsername } from '../../hooks/useUsername';
import styles from '../../styles/CreatePostScreen.styles';

const UserInfo: React.FC = () => {
  const { username } = useUsername();
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.userInfo}>
      <View style={[styles.logoCircle]}>
        <Image
          source={require('../../assets/framez.png')}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text style={[styles.username, { color: colors.textPrimary }]}>
          {username}
        </Text>
        <Text style={[styles.privacyText, { color: colors.textMuted }]}>Public</Text>
      </View>
    </View>
  );
};

export default UserInfo;
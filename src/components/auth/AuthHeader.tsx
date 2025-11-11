import React from 'react';
import { Text, View, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/Auth.styles';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  showLogo = true,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.logoContainer}>
      {showLogo && (
        <View style={[styles.logoCircle]}>
          <Image 
            source={require('../../assets/framez.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
      )}
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;
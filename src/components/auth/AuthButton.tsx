import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/Auth.styles';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const buttonStyle = disabled || loading
    ? [styles.authButton, { backgroundColor: colors.bgHover }, style]
    : [styles.authButton, { backgroundColor: colors.accent }, style];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={styles.authButtonText}>
        {loading ? `${title}...` : title}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
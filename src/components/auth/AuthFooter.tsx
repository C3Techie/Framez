import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/Auth.styles';

interface AuthFooterProps {
  question: string;
  actionText: string;
  onActionPress: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  question,
  actionText,
  onActionPress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.footerContainer}>
      <Text style={[styles.footerText, { color: colors.textSecondary }]}>
        {question}
      </Text>
      <TouchableOpacity onPress={onActionPress}>
        <Text style={[styles.footerLink, { color: colors.accent }]}>
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFooter;

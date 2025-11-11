import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import Icon from '../common/Icon';
import styles from '../../styles/FeedScreen.styles';

interface FeedHeaderProps {
  onNotificationPress?: () => void;
  onMessagePress?: () => void;
  onThemeToggle?: () => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  onNotificationPress,
  onMessagePress,
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

  return (
    <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Framez
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleThemeToggle}>
            <Icon 
              name={theme === 'dark' ? 'sun' : 'moon'} 
              size={20} 
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Icon name="bell" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onMessagePress}>
            <Icon name="message" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;
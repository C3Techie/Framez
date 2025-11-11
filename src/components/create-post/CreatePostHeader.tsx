import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

interface CreatePostHeaderProps {
  onBackPress: () => void;
  onSharePress: () => void;
  shareDisabled: boolean;
  loading: boolean;
}

const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({
  onBackPress,
  onSharePress,
  shareDisabled,
  loading,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const shareButtonStyle = shareDisabled
    ? [styles.shareButton, { backgroundColor: colors.bgHover }]
    : [styles.shareButton, { backgroundColor: colors.accent }];

  return (
    <View style={[styles.header, { backgroundColor: colors.bgSecondary, borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>✕</Text>
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create Post</Text>
      <TouchableOpacity 
        onPress={onSharePress}
        disabled={shareDisabled}
        style={shareButtonStyle}
      >
        <Text style={styles.shareButtonText}>
          {loading ? 'Posting...' : 'Share'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostHeader;
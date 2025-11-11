import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

interface MediaButtonsProps {
  onPickImage: () => void;
  onTakePhoto: () => void;
  disabled: boolean;
}

const MediaButtons: React.FC<MediaButtonsProps> = ({
  onPickImage,
  onTakePhoto,
  disabled,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.mediaButtons}>
      <TouchableOpacity
        style={[styles.mediaButton, { backgroundColor: colors.bgSecondary }]}
        onPress={onPickImage}
        disabled={disabled}
      >
        <Text style={[styles.mediaButtonText, { color: colors.accent }]}>
          📁 Choose from Library
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.mediaButton, { backgroundColor: colors.bgSecondary }]}
        onPress={onTakePhoto}
        disabled={disabled}
      >
        <Text style={[styles.mediaButtonText, { color: colors.accent }]}>
          📸 Take Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MediaButtons;
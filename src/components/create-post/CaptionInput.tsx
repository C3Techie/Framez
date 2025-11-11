import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

interface CaptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ value, onChangeText }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TextInput
      style={[styles.captionInput, { 
        color: colors.textPrimary,
        backgroundColor: colors.bgSecondary,
        borderColor: colors.border
      }]}
      placeholder="What's on your mind?"
      placeholderTextColor={colors.textMuted}
      value={value}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
    />
  );
};

export default CaptionInput;
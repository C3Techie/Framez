import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/PostCard.styles';

interface EditPostProps {
  editedCaption: string;
  onCaptionChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditPost: React.FC<EditPostProps> = ({
  editedCaption,
  onCaptionChange,
  onSave,
  onCancel,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.editContainer}>
      <TextInput
        style={[styles.editInput, { 
          color: colors.textPrimary,
          backgroundColor: colors.bgSecondary,
          borderColor: colors.border
        }]}
        value={editedCaption}
        onChangeText={onCaptionChange}
        multiline
        autoFocus
      />
      <View style={styles.editActions}>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.bgHover }]}
          onPress={onCancel}
        >
          <Text style={{ color: colors.textPrimary }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.accent }]}
          onPress={onSave}
        >
          <Text style={{ color: '#fff' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditPost;
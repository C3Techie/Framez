import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/CreatePostScreen.styles';

interface ImagePreviewProps {
  imageUri: string | null;
  onRemoveImage: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUri, onRemoveImage }) => {
  if (!imageUri) return null;

  return (
    <View style={styles.imagePreview}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity 
        style={styles.removeImageButton}
        onPress={onRemoveImage}
      >
        <Text style={styles.removeImageText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreview;
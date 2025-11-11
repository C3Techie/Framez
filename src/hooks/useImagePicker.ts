import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useImageSizeCheck } from './useImageSizeCheck';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { checkImageSize } = useImageSizeCheck();

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const isValidSize = await checkImageSize(selectedImage.uri);
      if (isValidSize) {
        setImageUri(selectedImage.uri);
      }
    }
  };

  const takePhoto = async (): Promise<void> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const isValidSize = await checkImageSize(selectedImage.uri);
      if (isValidSize) {
        setImageUri(selectedImage.uri);
      }
    }
  };

  const removeImage = (): void => {
    setImageUri(null);
  };

  return {
    imageUri,
    setImageUri,
    pickImage,
    takePhoto,
    removeImage,
  };
};
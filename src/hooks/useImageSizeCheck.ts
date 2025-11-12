import { Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export const useImageSizeCheck = () => {
  const checkImageSize = async (uri: string): Promise<boolean> => {
    try {
      // Only check file size on native platforms (iOS/Android) where FileSystem is available
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (fileInfo.exists && fileInfo.size) {
          if (fileInfo.size > MAX_IMAGE_SIZE) {
            Alert.alert(
              'Image Too Large',
              `Please select an image smaller than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB.`,
              [{ text: 'OK' }]
            );
            return false;
          }
          return true;
        }
      }
      // On web or if file info is unavailable, assume size is acceptable
      return true;
    } catch (error) {
      console.error('Error checking image size:', error);
    }
    return false;
  };

  return {
    checkImageSize,
  };
};
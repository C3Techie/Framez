import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useAuth } from '../context/AuthContext';
import { storage } from '../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

export const useAvatarUpload = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const checkImageSize = async (uri: string): Promise<boolean> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists && fileInfo.size) {
        if (fileInfo.size > MAX_AVATAR_SIZE) {
          Alert.alert(
            'Image Too Large',
            'Please select an image smaller than 2MB.',
            [{ text: 'OK' }]
          );
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error('Error checking image size:', error);
    }
    return false;
  };

  const pickAvatar = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const isValidSize = await checkImageSize(selectedImage.uri);
      if (isValidSize) {
        await uploadAvatar(selectedImage.uri);
      }
    }
  };

  const uploadAvatar = async (uri: string): Promise<void> => {
    if (!user) return;

    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/${user.uid}`);
      
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setAvatarUrl(downloadURL);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  return {
    avatarUrl,
    uploading,
    pickAvatar,
  };
};
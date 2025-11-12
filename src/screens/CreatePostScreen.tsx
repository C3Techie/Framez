import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import { usePostCreation } from '../hooks/usePostCreation';
import CreatePostHeader from '../components/create-post/CreatePostHeader';
import UserInfo from '../components/create-post/UserInfo';
import CaptionInput from '../components/create-post/CaptionInput';
import LoadingIndicator from '../components/create-post/LoadingIndicator';
import NetworkStatusBar from '../components/common/NetworkStatusBar';
import styles from '../styles/CreatePostScreen.styles';

type AppStackParamList = {
  Feed: undefined;
  Profile: undefined;
  CreatePost: undefined;
};
type CreatePostScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'CreatePost'>;

const CreatePostScreen = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation<CreatePostScreenNavigationProp>();

  const [caption, setCaption] = useState('');
  const { loading, createPost } = usePostCreation();

  const handlePost = async () => {
    // imageUri is now null since image upload is disabled
    const success = await createPost(caption, null);
    if (success) {
      setCaption('');
      navigation.navigate('Feed' as never);
    }
  };

  const shareDisabled = loading || !caption.trim();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]} edges={['top']}>
      {/* Add NetworkStatusBar at the top */}
      <NetworkStatusBar />
      
      <CreatePostHeader
        onBackPress={() => navigation.goBack()}
        onSharePress={handlePost}
        shareDisabled={shareDisabled}
        loading={loading}
      />

      <ScrollView style={styles.scrollView}>
        <UserInfo />
        
        <CaptionInput
          value={caption}
          onChangeText={setCaption}
        />

        <LoadingIndicator loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
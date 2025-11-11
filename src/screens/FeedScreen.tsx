import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import { usePosts } from '../hooks/usePosts';
import { useRefresh } from '../hooks/useRefresh';
import FeedHeader from '../components/feed/FeedHeader';
import FeedContent from '../components/feed/FeedContent';
import FloatingActionButton from '../components/feed/FloatingActionButton';
import BottomNavigation from '../components/feed/BottomNavigation';
import LoadingFeed from '../components/feed/LoadingFeed';
import NetworkStatusBar from '../components/common/NetworkStatusBar';
import styles from '../styles/FeedScreen.styles';

type AppStackParamList = {
  Feed: undefined;
  Profile: undefined;
  CreatePost: undefined;
};
type FeedScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Feed'>;

const FeedScreen = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const { posts, loading, refetch } = usePosts(true);
  const { refreshing, onRefresh } = useRefresh(refetch);

  const handlePostUpdate = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleNotificationPress = () => {
    Alert.alert('Coming Soon', 'Notifications feature coming soon!');
  };

  const handleMessagePress = () => {
    Alert.alert('Coming Soon', 'Messages feature coming soon!');
  };

  const handleSearchPress = () => {
    Alert.alert('Coming Soon', 'Search feature coming soon!');
  };

  const handleActivityPress = () => {
    Alert.alert('Coming Soon', 'Activity feature coming soon!');
  };

  if (loading) {
    return <LoadingFeed />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]} edges={['top']}>
      {/* Add NetworkStatusBar at the top */}
      <NetworkStatusBar />
      
      <FeedHeader
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />

      <FeedContent
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onPostUpdate={handlePostUpdate}
        onCreatePost={() => navigation.navigate('CreatePost' as never)}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate('CreatePost' as never)}
      />

      <BottomNavigation
        activeTab="home"
        onHomePress={() => {}} // Already on home
        onSearchPress={handleSearchPress}
        onCreatePress={() => navigation.navigate('CreatePost' as never)}
        onActivityPress={handleActivityPress}
        onProfilePress={() => navigation.navigate('Profile' as never)}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
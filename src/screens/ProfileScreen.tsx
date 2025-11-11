import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import { ProfileTab } from '../types/profile';
import { useUserPosts } from '../hooks/useUserPosts';
import { useAvatarUpload } from '../hooks/useAvatarUpload';
import { useProfileStats } from '../hooks/useProfileStats';
import { useRefresh } from '../hooks/useRefresh';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileTabs from '../components/profile/ProfileTabs';
import UserPosts from '../components/profile/UserPosts';
import SavedPosts from '../components/profile/SavedPosts';
import LoadingProfile from '../components/profile/LoadingProfile';
import NetworkStatusBar from '../components/common/NetworkStatusBar';
import styles from '../styles/ProfileScreen.styles';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  
  const { posts, loading, refetch } = useUserPosts(true);
  const { avatarUrl, uploading: uploadingAvatar, pickAvatar } = useAvatarUpload();
  const stats = useProfileStats(posts);
  const { refreshing, onRefresh } = useRefresh(refetch);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handlePostUpdate = () => {
    refetch();
  };

  if (loading) {
    return <LoadingProfile />;
  }

  const username = user?.email?.split('@')[0] || 'User';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]} edges={['top']}>
      {/* Add NetworkStatusBar at the top */}
      <NetworkStatusBar />
      
      <ProfileHeader
        username={username}
        onLogoutPress={handleLogout}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
      >
        <ProfileInfo
          userEmail={user?.email || ''}
          avatarUrl={avatarUrl}
          uploadingAvatar={uploadingAvatar}
          onAvatarPress={pickAvatar}
        />

        <ProfileStats stats={stats} />

        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'posts' ? (
          <UserPosts
            posts={posts}
            onPostUpdate={handlePostUpdate}
          />
        ) : (
          <SavedPosts />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
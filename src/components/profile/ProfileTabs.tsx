import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { ProfileTab } from '../../types/profile';
import styles from '../../styles/ProfileScreen.styles';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
      <TouchableOpacity 
        style={[
          styles.tab, 
          activeTab === 'posts' && [styles.activeTab, { borderBottomColor: colors.accent }]
        ]}
        onPress={() => onTabChange('posts')}
      >
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'posts' ? colors.accent : colors.textMuted }
        ]}>
          📸 Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.tab, 
          activeTab === 'saved' && [styles.activeTab, { borderBottomColor: colors.accent }]
        ]}
        onPress={() => onTabChange('saved')}
      >
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'saved' ? colors.accent : colors.textMuted }
        ]}>
          💾 Saved
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTabs;
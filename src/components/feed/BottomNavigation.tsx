import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import Icon from '../common/Icon';
import styles from '../../styles/FeedScreen.styles';

interface BottomNavigationProps {
  activeTab: string;
  onHomePress: () => void;
  onSearchPress: () => void;
  onCreatePress: () => void;
  onActivityPress: () => void;
  onProfilePress: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onHomePress,
  onSearchPress,
  onCreatePress,
  onActivityPress,
  onProfilePress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const getIconColor = (tabName: string) => 
    activeTab === tabName ? colors.accent : colors.textMuted;

  const getLabelColor = (tabName: string) =>
    activeTab === tabName ? colors.accent : colors.textMuted;

  return (
    <View style={[styles.bottomNav, { backgroundColor: colors.bgSecondary, borderTopColor: colors.border }]}>
      <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
        <Icon name="home" size={24} color={getIconColor('home')} />
        <Text style={[styles.navLabel, { color: getLabelColor('home') }]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={onSearchPress}>
        <Icon name="search" size={24} color={getIconColor('search')} />
        <Text style={[styles.navLabel, { color: getLabelColor('search') }]}>Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={onCreatePress}>
        <Icon name="plus" size={24} color={getIconColor('create')} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={onActivityPress}>
        <Icon name="heart" size={24} color={getIconColor('activity')} />
        <Text style={[styles.navLabel, { color: getLabelColor('activity') }]}>Activity</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
        <Icon name="profile" size={24} color={getIconColor('profile')} />
        <Text style={[styles.navLabel, { color: getLabelColor('profile') }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
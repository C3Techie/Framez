import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/PostCard.styles';

interface PostMenuProps {
  visible: boolean;
  onClose: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const PostMenu: React.FC<PostMenuProps> = ({
  visible,
  onClose,
  onEditPress,
  onDeletePress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <View style={[styles.menu, { backgroundColor: colors.bgCard }]}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              onEditPress();
              onClose();
            }}
          >
            <Text style={[styles.menuText, { color: colors.textPrimary }]}>
              Edit Post
            </Text>
          </TouchableOpacity>
          <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onDeletePress}
          >
            <Text style={[styles.menuText, { color: colors.error }]}>
              Delete Post
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PostMenu;
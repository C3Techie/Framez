import React from 'react';
import { Text, View, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import styles from '../../styles/PostCard.styles';

interface PostContentProps {
  caption: string;
  imageUrl: string | null;
}

const PostContent: React.FC<PostContentProps> = ({ caption, imageUrl }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <>
      {caption && (
        <View style={styles.captionContainer}>
          <Text style={[styles.caption, { color: colors.textPrimary }]}>
            {caption}
          </Text>
        </View>
      )}

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </>
  );
};

export default PostContent;
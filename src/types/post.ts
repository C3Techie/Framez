export interface Post {
  id: string;
  authorId: string;
  authorUsername: string;
  caption: string;
  imageUrl: string | null;
  timestamp: { seconds: number, nanoseconds: number } | null;
  likes?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

export interface PostCardProps {
  post: Post;
  onUpdate?: () => void;
}
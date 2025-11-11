import { Post } from './post';

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export type ProfileTab = 'posts' | 'saved';
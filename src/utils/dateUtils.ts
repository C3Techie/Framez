import { formatDistanceToNow } from 'date-fns';

export const formatPostDate = (timestamp: { seconds: number, nanoseconds: number } | null): string => {
  const postDate = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
  return formatDistanceToNow(postDate, { addSuffix: true });
};
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Extracts username from email address
 * @param email - User's email address
 * @returns Username part before @ symbol
 */
export const getUsernameFromEmail = (email: string | null | undefined): string => {
  return email?.split('@')[0] || 'User';
};

/**
 * Fetches username from Firestore for a given user ID
 * @param userId - The user's unique ID
 * @param fallbackEmail - Optional email to use as fallback
 * @returns Promise with username or fallback value
 */
export const fetchUsernameFromFirestore = async (
  userId: string,
  fallbackEmail?: string | null
): Promise<string> => {
  if (!userId) {
    return fallbackEmail ? getUsernameFromEmail(fallbackEmail) : 'Unknown User';
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const username = userDoc.data().username;
      if (username) {
        return username;
      }
    }
    // Fallback to email-based username if no Firestore username
    return fallbackEmail ? getUsernameFromEmail(fallbackEmail) : 'User';
  } catch (error) {
    console.error('Error fetching username from Firestore:', error);
    // Fallback to email-based username on error
    return fallbackEmail ? getUsernameFromEmail(fallbackEmail) : 'User';
  }
};

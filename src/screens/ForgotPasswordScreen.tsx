import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/Colors';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import AuthHeader from '../components/auth/AuthHeader';
import AuthButton from '../components/auth/AuthButton';
import styles from '../styles/Auth.styles';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for instructions to reset your password.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Login' as never)
          }
        ]
      );
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.bgPrimary }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <AuthHeader
            title="Reset Password"
            subtitle="Enter your email to receive a password reset link"
            showLogo={true}
          />

          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: colors.bgSecondary }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Enter your email address"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <AuthButton
              title="Send Reset Link"
              onPress={handleResetPassword}
              loading={loading}
              disabled={loading}
            />

            <TouchableOpacity 
              style={styles.footerContainer}
              onPress={() => navigation.navigate('Login' as never)}
            >
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                Remember your password?
              </Text>
              <Text style={[styles.footerLink, { color: colors.accent }]}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
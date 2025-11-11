import React, { useState } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert, 
  Text // ADD THIS IMPORT
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthForm } from '../hooks/useAuthForm';
import { Colors } from '../constants/Colors';
import AuthHeader from '../components/auth/AuthHeader';
import AuthForm from '../components/auth/AuthForm';
import AuthFooter from '../components/auth/AuthFooter';
import styles from '../styles/Auth.styles';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const { signup } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { formData, loading, setLoading, updateField, validateForm } = useAuthForm(true);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSignUp = async (data: any) => {
    setSignupError(null);
    
    const error = validateForm();
    if (error) {
      setSignupError(error);
      return;
    }

    setLoading(true);
    try {
      await signup(data.email, data.password);
      setSignupError(null);
    } catch (error: any) {
      setSignupError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPrimary }} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.bgPrimary }]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
          <AuthHeader
            title="Create Account"
            subtitle="Join Framez to start sharing your moments"
            showLogo={true}
          />

          {/* Show signup error if exists */}
          {signupError && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error + '20', borderColor: colors.error }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>
                {signupError}
              </Text>
            </View>
          )}

          <AuthForm
            onSubmit={handleSignUp}
            loading={loading}
            isSignUp={true}
            formData={formData}
            updateField={updateField}
          />

          <AuthFooter
            question="Already have an account?"
            actionText="Sign In"
            onActionPress={() => navigation.navigate('Login' as never)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
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
type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { formData, loading, setLoading, updateField, validateForm } = useAuthForm(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    // Clear previous errors
    setLoginError(null);
    
    const error = validateForm();
    if (error) {
      setLoginError(error);
      return;
    }

    setLoading(true);
    try {
      await login(data.email, data.password);
      // Clear error on successful login
      setLoginError(null);
    } catch (error: any) {
      // Set the error message from AuthContext
      setLoginError(error.message);
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
            title="Framez"
            subtitle="Share your world, one frame at a time"
            showLogo={true}
          />

          {/* Show login error if exists */}
          {loginError && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error + '20', borderColor: colors.error }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>
                {loginError}
              </Text>
            </View>
          )}

          <AuthForm
            onSubmit={handleLogin}
            loading={loading}
            isSignUp={false}
            formData={formData}
            updateField={updateField}
            onForgotPasswordPress={() => navigation.navigate('ForgotPassword' as never)}
          />

          <AuthFooter
            question="Don't have an account?"
            actionText="Sign Up"
            onActionPress={() => navigation.navigate('SignUp' as never)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
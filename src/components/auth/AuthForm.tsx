import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { AuthFormData } from '../../types/auth';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import AuthButton from './AuthButton';
import { usePasswordToggle } from '../../hooks/usePasswordToggle';
import styles from '../../styles/Auth.styles';

interface CustomAuthFormProps {
  onSubmit: (data: AuthFormData) => void;
  loading: boolean;
  isSignUp?: boolean;
  formData: AuthFormData;
  updateField: (field: keyof AuthFormData, value: string) => void;
  onForgotPasswordPress?: () => void;
}

const AuthForm: React.FC<CustomAuthFormProps> = ({
  onSubmit,
  loading,
  isSignUp = false,
  formData,
  updateField,
  onForgotPasswordPress,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.form}>
      {isSignUp && (
        <FormInput
          value={formData.username || ''}
          onChangeText={(text: string) => updateField('username', text)}
          placeholder="Username"
        />
      )}

      <FormInput
        value={formData.email}
        onChangeText={(text: string) => updateField('email', text)}
        placeholder="Email address"
        keyboardType="email-address"
      />

      <PasswordInput
        value={formData.password}
        onChangeText={(text: string) => updateField('password', text)}
        placeholder="Password"
        secureTextEntry={passwordToggle.secureTextEntry}
        onToggleVisibility={passwordToggle.toggleVisibility}
      />

      {isSignUp && (
        <PasswordInput
          value={formData.confirmPassword || ''}
          onChangeText={(text: string) => updateField('confirmPassword', text)}
          placeholder="Confirm Password"
          secureTextEntry={confirmPasswordToggle.secureTextEntry}
          onToggleVisibility={confirmPasswordToggle.toggleVisibility}
        />
      )}

      {!isSignUp && onForgotPasswordPress && (
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={onForgotPasswordPress}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      )}

      {isSignUp && (
        <Text style={[styles.termsText, { color: colors.textSecondary }]}>
          By signing up, you agree to our{' '}
          <Text style={[styles.termsLink, { color: colors.accent }]}>
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text style={[styles.termsLink, { color: colors.accent }]}>
            Privacy Policy
          </Text>
        </Text>
      )}

      <AuthButton
        title={isSignUp ? 'Create Account' : 'Log In'}
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
};

export default AuthForm;

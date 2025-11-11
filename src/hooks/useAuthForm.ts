import { useState } from 'react';
import { AuthFormData } from '../types/auth';

export const useAuthForm = (isSignUp = false) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.email || !formData.password) {
      return 'Please fill in all required fields.';
    }

    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address.';
    }

    if (isSignUp) {
      if (!formData.username || !formData.confirmPassword) {
        return 'Please fill in all fields.';
      }

      if (formData.username.length < 3) {
        return 'Username must be at least 3 characters long.';
      }

      if (formData.password !== formData.confirmPassword) {
        return 'Passwords do not match.';
      }
    }

    if (formData.password.length < 6) {
      return 'Password should be at least 6 characters.';
    }

    return null;
  };

  return {
    formData,
    loading,
    setLoading,
    updateField,
    validateForm,
  };
};
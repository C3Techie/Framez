export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

export interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void;
  loading: boolean;
  isSignUp?: boolean;
}

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
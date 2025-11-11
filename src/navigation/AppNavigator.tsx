import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import NetworkStatusBar from '../components/common/NetworkStatusBar';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // ADD THIS
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined; // ADD THIS
};

type AppStackParamList = {
  Feed: undefined;
  Profile: undefined;
  CreatePost: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

// Stack for unauthenticated users
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

// Stack for authenticated users
const AppNavigatorContent = () => (
  <AppStack.Navigator 
    screenOptions={{ 
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Feed" component={FeedScreen} />
    <AppStack.Screen name="Profile" component={ProfileScreen} />
    <AppStack.Screen name="CreatePost" component={CreatePostScreen} />
  </AppStack.Navigator>
);

// Main Navigator component that switches based on auth state
const AppNavigator = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const navigatorTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  const customTheme = {
    ...navigatorTheme,
    colors: {
      ...navigatorTheme.colors,
      background: colors.bgPrimary,
      card: colors.bgSecondary,
      text: colors.textPrimary,
      border: colors.border,
    },
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer theme={customTheme}>
      {/* Add NetworkStatusBar here for global coverage */}
      <NetworkStatusBar />
      {user ? <AppNavigatorContent /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
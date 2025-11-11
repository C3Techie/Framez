import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container styles (needed for ForgotPasswordScreen)
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  // Logo & Header
logoContainer: {
  alignItems: 'center',
  marginBottom: 48,
},
logoCircle: {
  width: 100,
  height: 100,
  borderRadius: 50, // Perfect circle
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  overflow: 'hidden',
  backgroundColor: 'transparent', // Remove blue background
},
logoImage: {
  width: '100%',
  height: '100%',
  borderRadius: 50, // Same as container for perfect circle
},
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },

  // Form
  form: {
    width: '100%',
    gap: 12,
  },
  inputContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },

  // Buttons
  authButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 16,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Links
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Terms
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 16,
  },
  termsLink: {
    fontWeight: '500',
  },

  // Footer
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Error
  errorContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;
# 📱 Framez

A modern, feature-rich social media mobile application built with React Native and Firebase. Share your moments, connect with others, and explore a beautiful feed of posts.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🌟 Features

### Authentication
- ✅ **Secure Sign Up** - Create new accounts with email and password
- ✅ **Login** - Sign in to your account securely
- ✅ **Logout** - Sign out safely
- ✅ **Forgot Password** - Reset password functionality
- ✅ **Persistent Sessions** - Stay logged in across app restarts
- ✅ **Error Handling** - Clear error messages for auth issues

### Posts
- ✅ **Create Posts** - Share text and/or images
- ✅ **Real-time Feed** - See posts from all users instantly
- ✅ **Post Details** - View author, timestamp, and content
- ✅ **Like Posts** - Interact with posts you love
- ✅ **Comment System** - Engage in conversations
- ✅ **Delete Posts** - Remove your own posts

### Profile
- ✅ **User Profile** - View your information and stats
- ✅ **Your Posts** - See all posts you've created
- ✅ **Edit Profile** - Update your information (coming soon)

### UI/UX
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Pull to Refresh** - Refresh feed with a swipe
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Empty States** - Helpful messages when no content
- ✅ **SafeArea Support** - Works perfectly on all devices
- ✅ **Responsive Design** - Adapts to different screen sizes

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20.15.1 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (iOS or Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/C3Techie/Framez.git
   cd Framez
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   > **Note:** You can get these credentials from your [Firebase Console](https://console.firebase.google.com/) > Project Settings > General tab

4. **Start the development server**
   ```bash
   npm expo start
   # or
   expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 📦 Building APK

### Method 1: EAS Build (Recommended)

This method uses Expo's cloud build service - no local Android setup required!

#### Prerequisites
- Expo account ([Sign up at expo.dev](https://expo.dev))
- EAS CLI installed globally

#### Steps

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Check for dependency issues**
   
   Before building, always verify your dependencies are correct:
   ```bash
   npx expo-doctor
   ```
   
   Fix any issues reported:
   - Missing peer dependencies: `npx expo install <package-name>`
   - Version mismatches: `npx expo install <package-name>`

3. **Login to Expo**
   ```bash
   eas login
   ```

4. **Configure EAS Build** (if not already done)
   ```bash
   eas build:configure
   ```

5. **Build the APK**
   ```bash
   eas build -p android --profile production
   ```
   
   The build process:
   - Runs on Expo's cloud servers (you can close your terminal/computer)
   - Takes approximately 5-15 minutes
   - Automatically increments version code
   - Handles keystore generation
   
6. **Download your APK**
   - Get the download link from the terminal output
   - Or visit [expo.dev](https://expo.dev/accounts/c3techie/projects/Framez/builds)

### Method 2: Local Build (Advanced)

For developers who want faster builds and more control.

#### Prerequisites
- Android Studio or Android SDK installed
- JDK 17+ installed
- All dependencies verified with `npx expo-doctor`

#### Steps

1. **Check dependencies**
   ```bash
   npx expo-doctor
   ```
   Fix all issues before proceeding!

2. **Prebuild Android folder**
   ```bash
   npx expo prebuild --platform android
   ```

3. **Build the APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   If the build fails:
   ```bash
   cd ..
   npx expo install
   npx expo prebuild --platform android --clean
   cd android
   ./gradlew assembleRelease
   ```

4. **Find your APK**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

**Note:** After the first successful build, subsequent builds are much faster!

## 🏗️ Project Structure

```
Framez/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Shared components
│   │   ├── create-post/    # Post creation components
│   │   ├── feed/           # Feed-related components
│   │   ├── post/           # Post display components
│   │   ├── profile/        # Profile components
│   │   └── ui/             # Base UI components
│   ├── config/             # App configuration
│   │   └── firebaseConfig.ts
│   ├── constants/          # App constants
│   │   └── Colors.ts
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── CreatePostScreen.tsx
│   ├── styles/             # Component styles
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── assets/                 # Images and static assets
├── App.tsx                 # Root component
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **React Context API** - State management

### Backend & Services
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - Real-time database
- **Firebase Storage** - Image storage
- **Expo File System** - File management

### UI/UX
- **Custom Theme System** - Dark/Light mode
- **SafeAreaView** - Safe area handling
- **React Native Safe Area Context** - Advanced safe area support

## 🔥 Firebase Setup

This app uses Firebase as the backend. Here's what you need to set up:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firebase for mobile apps

### 2. Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable **Email/Password** provider

### 3. Set up Firestore Database
1. Go to Firestore Database
2. Create database in production mode (or test mode)
3. Set up security rules
  

### 4. Set up Storage
1. Go to Storage
2. Create a default bucket
3. Set up security rules:
  

## 🧪 Testing

### Using Expo Go
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `expo start`
3. Scan QR code with Expo Go app

### Using Appetize.io
Visit our hosted demo: [Framez on Appetize.io](#) *(Coming Soon)*

## 📸 Screenshots

*(Add your app screenshots here)*

## 🎥 Demo Video

Watch the full demo: [YouTube/Loom Link](#) *(Coming Soon)*


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is created as part of the HNG Internship Frontend Stage 4 Task.

## 👨‍💻 Author

**Christian**
- GitHub: [@C3Techie](https://github.com/C3Techie)

## 🙏 Acknowledgments

- HNG Internship program
- Firebase for backend services
- Expo team for amazing development tools
- React Native community


---

Made with ❤️ by Christian for HNG Internship

# 📱 Framez - Social Media Mobile App

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
- ✅ **Image Upload** - Upload photos from gallery or camera
- ✅ **Real-time Feed** - See posts from all users instantly
- ✅ **Post Details** - View author, timestamp, and content
- ✅ **Like Posts** - Interact with posts you love
- ✅ **Comment System** - Engage in conversations
- ✅ **Delete Posts** - Remove your own posts

### Profile
- ✅ **User Profile** - View your information and stats
- ✅ **Avatar Upload** - Customize your profile picture
- ✅ **Your Posts** - See all posts you've created
- ✅ **Profile Stats** - Track your posts and engagement
- ✅ **Edit Profile** - Update your information (coming soon)

### UI/UX
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Network Status** - Real-time connectivity monitoring
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
   npm start
   # or
   expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

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
- **Expo Image Picker** - Media selection
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
3. Set up security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /posts/{postId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth.uid == resource.data.authorId;
       }
     }
   }
   ```

### 4. Set up Storage
1. Go to Storage
2. Create a default bucket
3. Set up security rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /posts/{userId}/{postId} {
         allow read: if request.auth != null;
         allow write: if request.auth.uid == userId;
       }
       match /avatars/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth.uid == userId;
       }
     }
   }
   ```

## 📱 Running on Devices

### Android
```bash
npm run android
# or
expo start --android
```

### iOS
```bash
npm run ios
# or
expo start --ios
```

### Web (Preview)
```bash
npm run web
# or
expo start --web
```

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

## 🚧 Roadmap

- [ ] Edit profile functionality
- [ ] Search users and posts
- [ ] Direct messaging
- [ ] Push notifications
- [ ] Story feature
- [ ] Video posts
- [ ] Follow/Unfollow users
- [ ] Explore page

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

## 📞 Support

For support, email [your-email] or open an issue in this repository.

---

Made with ❤️ by Christian for HNG Internship

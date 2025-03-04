
# Personal Portfolio Website

This is a personal portfolio website built with React, Vite, Tailwind CSS, and Firebase.

## Customization Guide

### 1. Personal Information

To customize your personal details, update the following files:

- **Hero Section**: `src/components/sections/Hero.tsx` - Update your name, title, and tagline.
- **About Section**: `src/components/sections/About.tsx` - Update your bio, skills, and tools.
- **Projects Section**: `src/components/sections/Projects.tsx` - Update your project details.
- **Achievements Section**: `src/components/sections/Achievements.tsx` - Update your achievements.
- **Social Media**: `src/components/sections/SocialMedia.tsx` - Update your social media links.
- **Chatbot Data**: `src/services/chatbotService.ts` - Update the AI chatbot's knowledge about you.

### 2. Images

Replace the placeholder images with your own:

- Profile image in the About section
- Project images in the Projects section
- AI Gallery images

### 3. Firebase Configuration

To make Firebase functionality work properly:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Register your app and get the Firebase configuration
3. Create a `.env.local` file in the project root with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Enable Google authentication in your Firebase project:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
   - Configure the OAuth consent screen if needed

### 4. Lottie Animations

The app uses Lottie animations from the following locations:
- `src/assets/animations/chat-animation.json` - Used in the chatbot popup
- `src/assets/animations/coding-animation.json` - Used in the Projects section
- `src/assets/animations/ai-animation.json` - Used in the AI Gallery page

You can replace these with your own animations from [LottieFiles](https://lottiefiles.com/).

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

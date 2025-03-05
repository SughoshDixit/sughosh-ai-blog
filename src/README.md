
# Personal Portfolio Website

This is a personal portfolio website built with React, Vite, Tailwind CSS, and Firebase. It connects to a Python backend for advanced features like chatbot functionality, blog management, gallery image analysis, and more.

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or another package manager
- Python 3.8+ (for backend)
- Git

### Frontend Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root with your Firebase configuration:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Installation (Python)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python app.py
   ```

The backend server will run on `http://localhost:5000` by default.

## Firebase Configuration Guide

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name and follow the setup wizard
4. Enable Google Analytics if desired

### 2. Register Your Web App

1. From the project overview page, click the web icon (</>) to add a web app
2. Enter an app nickname and click "Register app"
3. Firebase will provide your configuration details that look like this:

```javascript
const firebaseConfig = {
  apiKey: "xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};
```

4. Copy these values into your `.env.local` file as described in the installation section

### 3. Set Up Authentication

1. In the Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable Google as a sign-in provider
3. Add authorized domains if needed
4. Save your changes

### 4. Configure Firestore Database

1. Go to "Firestore Database" in the Firebase Console
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode" (for development)
4. Select a location for your database
5. Add security rules as needed

### 5. Set Up Firebase Storage

1. Go to "Storage" in the Firebase Console
2. Click "Get started"
3. Choose security rules (start with test mode for development)
4. Set up CORS configuration if needed

## Making the Chatbot Functional

The chatbot feature requires both the frontend React app and the Python backend server to be running simultaneously:

1. **Start the Python Backend**:
   ```bash
   cd backend
   python app.py
   ```
   This will start the Flask server on port 5000.

2. **Ensure the Frontend is Connected**:
   The frontend is pre-configured to connect to `http://localhost:5000/api/chatbot` for chatbot responses.

3. **Customize Chatbot Responses**:
   To make the chatbot provide custom responses about yourself:
   - Open `backend/app.py`
   - Locate the `personal_info` dictionary
   - Update the values with your own information:

   ```python
   personal_info = {
     "name": "Your Name",
     "occupation": "Your Occupation",
     "skills": ["Skill 1", "Skill 2", ...],
     "interests": ["Interest 1", "Interest 2", ...],
     "achievements": ["Achievement 1", "Achievement 2", ...],
     # Update other fields as needed
   }
   ```

4. **Authentication**:
   The chatbot requires users to be authenticated via Firebase Google Authentication.
   Make sure your Firebase project has Google Authentication enabled as described in the Firebase Configuration section.

5. **Troubleshooting**:
   - If the chatbot doesn't respond, check your browser console for any CORS or network errors
   - Ensure both the frontend and backend servers are running
   - Verify your Firebase configuration in `.env.local` is correct
   - Check that you're signed in (authentication is required to use the chatbot)

## Customization Guide

### 1. Personal Information

To customize your personal details, update the following files:

- **Hero Section**: `src/components/sections/Hero.tsx` - Update your name, title, and tagline.
- **About Section**: `src/components/sections/About.tsx` - Update your bio, skills, and tools.
- **Projects Section**: `src/components/sections/Projects.tsx` - Update your project details.
- **Achievements Section**: `src/components/sections/Achievements.tsx` - Update your achievements.
- **Chatbot Data**: `backend/app.py` - Update the `personal_info` dictionary in the Python backend.

### 2. Images

Replace the placeholder images with your own:

- Profile image in the About section
- Project images in the Projects section
- AI Gallery images

## Embedding Python Notebooks in Blog Posts

The blog system supports embedding Python notebooks (Jupyter notebooks) in your blog posts:

1. Create your notebook (.ipynb file)
2. Upload the notebook to a public URL or GitHub repository
3. In your blog post content, use the NotebookEmbed component with the URL to your notebook:

```html
<NotebookEmbed src="URL-TO-YOUR-NOTEBOOK" />
```

For example, in your blog post content:

```html
<p>Here's the analysis of the dataset:</p>
<NotebookEmbed src="https://github.com/yourusername/repository/blob/main/notebook.ipynb" />
<p>As you can see from the results above...</p>
```

The blog system will automatically render the notebook inline with your blog post content.

## Development

To run both frontend and backend together:

1. Start the Python backend server:
   ```bash
   cd backend
   python app.py
   ```

2. In a separate terminal, start the React dev server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

See the `backend/DEPLOYMENT.md` file for detailed instructions on deploying the Python backend.

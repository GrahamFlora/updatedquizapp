import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// This configuration now builds itself from the individual environment variables.
// This is a more robust method than parsing a single JSON string.
const firebaseConfig = {
  apiKey: "AIzaSyAcuxbsdNsbKz6ztpzlLZOHIocvvhL9_UA",
  authDomain: "my-quiz-app-15c60.firebaseapp.com",
  projectId: "my-quiz-app-15c60",
  storageBucket: "my-quiz-app-15c60.firebasestorage.app",
  messagingSenderId: "418915708281",
  appId: "1:418915708281:web:81958e2b369b949d3ad3a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll need in other parts of your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = process.env.REACT_APP_APP_ID || 'default-app-id';
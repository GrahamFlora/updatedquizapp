import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0323781914",
  appId: "1:1048882285839:web:f8c7c60c7dcd23cbf6027a",
  apiKey: "AIzaSyDuCiKqXsvFbMMTBDvxZpL61t-upp-OlKs",
  authDomain: "gen-lang-client-0323781914.firebaseapp.com",
  storageBucket: "gen-lang-client-0323781914.firebasestorage.app",
  messagingSenderId: "1048882285839",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore specifying the named database
export const db = getFirestore(app, "ai-studio-updatedquizapp-14c8038c-302c-495b-9b7a-4dd9fd3340a1");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_MESSAGINGSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

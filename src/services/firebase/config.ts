/** @format */

import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATA_BASE_URL
};

export let app: FirebaseApp;
const apps = getApps();
if (apps?.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}
const firebaseApp = app;
const projectAuth = getAuth(app);
const db = getFirestore(app);
const projectStorage = getStorage(app);
export { projectStorage, db, projectAuth, ref, firebaseApp,};

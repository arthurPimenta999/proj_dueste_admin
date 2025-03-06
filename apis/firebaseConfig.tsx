import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "local",
  authDomain: "local",
  databaseURL: "local",
  projectId: "local",
  storageBucket: "local",
  messagingSenderId: "local",
  appId: "local",
  measurementId: "local"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

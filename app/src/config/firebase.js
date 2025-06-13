import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgOyvinhoEvaLt-P6BGGu6ibJ5o42id4g",
  authDomain: "hackathon-ffe34.firebaseapp.com",
  projectId: "hackathon-ffe34",
  storageBucket: "hackathon-ffe34.firebasestorage.app",
  messagingSenderId: "464463667547",
  appId: "1:464463667547:web:1c38beca363edb8d483a7e",
  measurementId: "G-VPSGNZGFXB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const secondaryApp = initializeApp(firebaseConfig, 'secondary');
export const secondaryAuth = getAuth(secondaryApp);

export default app;
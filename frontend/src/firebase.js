// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6nryhyTkzVfqOuJGM0u0jGVl7Y7ohOkg",
  authDomain: "fitzone-3e193.firebaseapp.com",
  projectId: "fitzone-3e193",
  storageBucket: "fitzone-3e193.appspot.com",
  messagingSenderId: "421992954841",
  appId: "1:421992954841:web:38ffee81f6651115e5f7c8",
  measurementId: "G-EBZCYQDJT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
export { storage, app as firebase };
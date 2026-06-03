// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI-Rjjyf6N9aFgaYmMoa95oLBY70TOay8",
  authDomain: "portfolio-analysis-99.firebaseapp.com",
  projectId: "portfolio-analysis-99",
  storageBucket: "portfolio-analysis-99.appspot.com",
  messagingSenderId: "62442839010",
  appId: "1:62442839010:web:e68c45616d0c4cfc64b7bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
export default app;
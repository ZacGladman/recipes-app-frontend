// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration.
//
// Usually, you need to fastidiously guard API keys (for example, by
// setting the keys as environment variables);
// however, API keys for Firebase services are ok to include in code or checked-in config files.
const firebaseConfig = {
  apiKey: "AIzaSyBIW_OPhkAAikA1LBT1sJkatdoLtZSG9_8",
  authDomain: "chefbook-recipe-app.firebaseapp.com",
  projectId: "chefbook-recipe-app",
  storageBucket: "chefbook-recipe-app.appspot.com",
  messagingSenderId: "813619472561",
  appId: "1:813619472561:web:86309f5f999fd7f6885a90",
};

// Initialize Firebase as a whole
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//Other auth providers include github, twitter, apple.
//These must be enabled in your firebase console.
export const googleAuthProvider = new GoogleAuthProvider();

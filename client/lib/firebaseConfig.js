// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI--QjaTRaVYgyX7eFqycsL09u4S8ve18",
  authDomain: "simplemessaging-27732.firebaseapp.com",
  databaseURL: "https://simplemessaging-27732-default-rtdb.firebaseio.com",
  projectId: "simplemessaging-27732",
  storageBucket: "simplemessaging-27732.appspot.com",
  messagingSenderId: "440471671365",
  appId: "1:440471671365:web:166a36754de5b2af5b092c",
  measurementId: "G-5M665TM6QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyb0KYPhxdOSv2vgf2Xgl0cxJdAOxX2QY",
  authDomain: "fir-flutter-codelab-c3a6e.firebaseapp.com",
  projectId: "fir-flutter-codelab-c3a6e",
  storageBucket: "fir-flutter-codelab-c3a6e.appspot.com",
  messagingSenderId: "644474474710",
  appId: "1:644474474710:web:00768378f80dd0262cb977",
  measurementId: "G-GPRXCCKHLZ",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };

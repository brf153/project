import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq7EH1f4atXtv6xJ-Qp9P2Ueq_SISiFXU",
  authDomain: "fir-project-2e8fc.firebaseapp.com",
  projectId: "fir-project-2e8fc",
  storageBucket: "fir-project-2e8fc.appspot.com",
  messagingSenderId: "1002303769564",
  appId: "1:1002303769564:web:e7d191d1286ce3671c5d19",
  measurementId: "G-B96ETH5E72"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = initializeApp(firebaseConfig);
/*const db = firebaseApp.firestore();*/

export { db, firebaseApp, firebase};

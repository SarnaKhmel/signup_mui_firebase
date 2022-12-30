import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvcUxgOmK2nJxSn1SnT6OiA4EkZ1Li5DU",
  authDomain: "mytestapp-22114.firebaseapp.com",
  projectId: "mytestapp-22114",
  storageBucket: "mytestapp-22114.appspot.com",
  messagingSenderId: "292153987200",
  appId: "1:292153987200:web:41fa2fe4de8244febc9665",
  measurementId: "G-LV2XDMXP70",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo_IWPK7Ps2TOak6dAJrq0qcFVrTHvBsM",
  authDomain: "products-d9f17.firebaseapp.com",
  projectId: "products-d9f17",
  storageBucket: "products-d9f17.appspot.com",
  messagingSenderId: "836797383763",
  appId: "1:836797383763:web:9de503a1d8795d6cd432a6",
  measurementId: "G-KE5WHG74RM"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);

export { authInstance };
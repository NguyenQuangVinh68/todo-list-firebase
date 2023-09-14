import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCddZoAU8Ohd2-AIRt5RXnncKj6rD_zC8",
    authDomain: "todoapp-c4940.firebaseapp.com",
    projectId: "todoapp-c4940",
    storageBucket: "todoapp-c4940.appspot.com",
    messagingSenderId: "1006067425998",
    appId: "1:1006067425998:web:318641a798ccb6debee69f"
};

const db = getFirestore(initializeApp(firebaseConfig))

export { db }
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfremo1k3e8_3NNchdgiN3QNQJcEopbys",
    authDomain: "bug-tracker-642f3.firebaseapp.com",
    projectId: "bug-tracker-642f3",
    storageBucket: "bug-tracker-642f3.appspot.com",
    messagingSenderId: "412611368718",
    appId: "1:412611368718:web:af62761b1ea4de496b295f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveBug = (name, project, status, due, responsible) =>
    addDoc(collection(db, 'bugs'), { name, project, status, due, responsible });

export const getBugs = () => getDocs(collection(db, 'bugs'));

export const onGetBugs = () => console.log(onGetBugs);

export {
    onSnapshot,
    collection,
    db
}
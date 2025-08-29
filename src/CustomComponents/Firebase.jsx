// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyDp5rzbb21-eF3R-P0di4zmLp6eHpy-VwA",
//     authDomain: "onnbitnew.firebaseapp.com",
//     databaseURL: "https://onnbitnew-default-rtdb.firebaseio.com",
//     projectId: "onnbitnew",
//     storageBucket: "onnbitnew.firebasestorage.app",
//     messagingSenderId: "302017664970",
//     appId: "1:302017664970:web:81161bb94f9e59e933e133",
//     measurementId: "G-71Y2YFBDFN"
// };
const firebaseConfig = {
    apiKey: "AIzaSyC49PKzo0socr74i-PV9OVa_Na0tmQ_fFE",
    authDomain: "onnbit06.firebaseapp.com",
    projectId: "onnbit06",
    storageBucket: "onnbit06.firebasestorage.app",
    messagingSenderId: "290935651400",
    appId: "1:290935651400:web:17f22efbbdd54754792c7d",
    measurementId: "G-J23858BPE2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, messaging };

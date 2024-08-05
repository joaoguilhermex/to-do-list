import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCvfEfVJBk_vXNH-sjfxXQ_Dbwro8_apkY",
    authDomain: "reactcourse-6aa6a.firebaseapp.com",
    projectId: "reactcourse-6aa6a",
    storageBucket: "reactcourse-6aa6a.appspot.com",
    messagingSenderId: "359524189979",
    appId: "1:359524189979:web:600e31c90c0f018ca3f5be",
    measurementId: "G-DM294VS5C6"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth};
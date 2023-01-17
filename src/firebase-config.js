import { initializeApp } from "firebase/app";
import {getAuth, } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA8dtGpSxxtElN3JOfPxwr0-SslVV7v2WI",
    authDomain: "scheduleapp-ee2ed.firebaseapp.com",
    projectId: "scheduleapp-ee2ed",
    storageBucket: "scheduleapp-ee2ed.appspot.com",
    messagingSenderId: "988290914923",
    appId: "1:988290914923:web:8cf28eac768c6882016f2e",
    measurementId: "G-6WF91ZBDT2"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
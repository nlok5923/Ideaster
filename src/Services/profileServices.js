import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/storage";
import "@firebase/database";
import "firebase/firestore";
dotenv.config();

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
}

const db = firebase.firestore();

export const updateProfile = async (profile, address) => {
  try {
    await db.collection("users").doc(address).set({
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      email: profile.email,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      profession: profile.profession,
      aboutYou: profile.aboutYou,
      terms: profile.terms,
      age: profile.age,
    });
    return true;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

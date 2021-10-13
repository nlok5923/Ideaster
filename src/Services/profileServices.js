import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/storage";
import "@firebase/database";
import "firebase/firestore";
dotenv.config();
// REACT_APP_API_KEY=AIzaSyDUAVFi7e-XCQNKDMUDcePev6aKZEsTkQU
// REACT_APP_AUTH_DOMAIN=ideaster-9a445.firebaseapp.com
// REACT_APP_PROJECT_ID=ideaster-9a445
// REACT_APP_STORAGE_BUCKET=ideaster-9a445.appspot.com
// REACT_APP_MESSAGING_SENDER_ID=81334780889
// REACT_APP_APP_ID=1:81334780889:web:fc4dd2a73b646728830fc8

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDUAVFi7e-XCQNKDMUDcePev6aKZEsTkQU",
    authDomain: "ideaster-9a445.firebaseapp.com",
    projectId: "ideaster-9a445",
    storageBucket: "ideaster-9a445.appspot.com",
    messagingSenderId: "81334780889",
    appId: "1:81334780889:web:fc4dd2a73b646728830fc8",
  });
}

const db = firebase.firestore();

export const updateProfile = async (profile, address) => {
  try {
    const profileInfo = {
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
    };
    console.log(profileInfo);
    await db
      .collection("users")
      .doc(address)
      .set(profileInfo)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
    return true;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const getParticularUserProfile = async (address) => {
  try {
    const userData = await db.collection("users").doc(address).get();
    console.log(userData.data());
    return userData.data();
  } catch (err) {
    console.log(err.message);
  }
};

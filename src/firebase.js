import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database"

//for development environment
const app =  firebase.initializeApp({
  apiKey: "AIzaSyA9HGKDrCne1Jl9CQ78kz28Q0KQsKhq2WM",
  authDomain: "auth-development-3ba6d.firebaseapp.com",
  databaseURL: "https://auth-development-3ba6d-default-rtdb.firebaseio.com",
  projectId: "auth-development-3ba6d",
  storageBucket: "auth-development-3ba6d.appspot.com",
  messagingSenderId: "119169041628",
  appId: "1:119169041628:web:f5791588ff88b607632019",
  measurementId: "G-CL0NRKMEE2"
});

//export const databaseDb =  app.database().ref();
export const databaseDb =  app.database();
export const storage = app.storage()
export const auth = app.auth();
export default app;

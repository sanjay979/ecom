
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB5Fw1lUSzOxVLnmJnTH7jsayZuuoLJM1Y",
  authDomain: "ezone-71eaa.firebaseapp.com",
  projectId: "ezone-71eaa",
  storageBucket: "ezone-71eaa.appspot.com",
  messagingSenderId: "129606820803",
  appId: "1:129606820803:web:0d70775c2ca95fc4985376",
  measurementId: "G-4VDNS2EJRS"
});


var db = firebaseApp.firestore();

const fs = firebase
const auth    = firebase.auth();
const dba     = firebase.firestore();
export { db,auth,dba,fs };
import firebase from "firebase";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "telegram-clone-redux.firebaseapp.com",
  projectId: "telegram-clone-redux",
  storageBucket: "telegram-clone-redux.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export {auth, provider};

export default db;
import firebase from "firebase";


const firebaseConfig = {

  // Your Config Key from firebase project.

};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export {auth, provider};

export default db;
import { Firestore } from "@firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyC_K--t3XLntBTN_NWsR7rhIf_B2Fec5Fk",
    authDomain: "ai-covid-19-21657.firebaseapp.com",
    projectId: "ai-covid-19-21657",
    storageBucket: "ai-covid-19-21657.appspot.com",
    messagingSenderId: "402886386383",
    appId: "1:402886386383:web:3857ce748855a0ea48cdba"
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getEmail(db: Firestore) {
//     const UsersCol = collection(db, 'Users');
//     const UsersSnapshot = await getDocs(UsersCol);
//     const UsersList = UsersSnapshot.docs.map(doc => doc.data());
//     console.log(`UsersList: ${JSON.stringify(UsersList)}`)
//     return UsersList;
// }
// getEmail(db);

const provider = new GoogleAuthProvider();
const auth = getAuth();

signInWithPopup(auth, provider)
    .then((result) => {
        console.log("asdf1");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("******************************")
        console.log(`errorCode: ${errorCode}`)
        console.log(`errorMessage: ${errorMessage}`)
        console.log(`email: ${email}`)
    });
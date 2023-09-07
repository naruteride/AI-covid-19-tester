import { initializeApp } from "firebase/app";
import { Firestore } from "@firebase/firestore/lite";
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
export default app;

// DB 접근 테스트: 됨
// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getEmail(db: Firestore) {
//     const UsersCol = collection(db, 'Users');
//     const UsersSnapshot = await getDocs(UsersCol);
//     const UsersList = UsersSnapshot.docs.map(doc => doc.data());
//     console.log(`UsersList: ${JSON.stringify(UsersList)}`)
//     return UsersList;
// }
// getEmail(db)
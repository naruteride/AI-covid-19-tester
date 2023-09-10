import { initializeApp } from "firebase/app";
import { Firestore } from "@firebase/firestore/lite";
import { getFirestore, collection, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore/lite';
import { useRecoilState, useRecoilValue } from "recoil";
import { resultState } from "../main/Uploader";
import { userState } from "./Auth";
import { User } from "firebase/auth";

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
const db = getFirestore(app);



// 결과를 DB에 저장함
async function uploadResultData() {
    const result = useRecoilValue(resultState);
    const user: User | null = useRecoilValue(userState)

    await setDoc(doc(db, "XrayResults"), {
        'userID': user?.uid,
        'date': Timestamp.now(),
        'healthy': result["건강함"],
        'covid-19': result["코로나-19"],
        'viral pneumonia': result["바이러스성 폐렴"],
        'bacterial pneumonia': result["박테리아성 폐렴"]
    });
}
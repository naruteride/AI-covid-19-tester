import { initializeApp } from "firebase/app";
import { Firestore } from "@firebase/firestore/lite";
import { getFirestore, collection, getDocs, setDoc, doc, Timestamp, query, where, addDoc } from 'firebase/firestore/lite';
import { useRecoilState, useRecoilValue } from "recoil";
import { ResultStateType, resultState } from "../main/Uploader";
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
export async function uploadResultData(user: User | null, result: ResultStateType) {
    const formetedDate = formatDate(new Date())
    const [todayStartTimestamp, todayEndTimestamp] = getStartEndTimestamp(formetedDate);
    if (user === null) {
        // 로그인 안 했으면 바로 리턴
        return;
    }

    // 유저가 오늘 업로드 한 X-ray 문서를 고르는 쿼리
    const q = query(
        collection(db, "XrayResults"),
        where("userID", "==", user.uid),
        where("date", ">=", todayStartTimestamp),
        where("date", "<=", todayEndTimestamp)
    );
    const docSnap = (await getDocs(q)).docs[0];
    
    if (docSnap) {
        // 만약 이미 오늘 X-ray 문서가 존재한다면 덮어쓰기
        await setDoc(doc(db, "XrayResults", docSnap.id), {
            'userID': user.uid,
            'date': Timestamp.now(),
            'healthy': result["건강함"],
            'covid-19': result["코로나-19"],
            'viral pneumonia': result["바이러스성 폐렴"],
            'bacterial pneumonia': result["박테리아성 폐렴"]
        });
    } else {
        // 만약 오늘 X-ray 문서가 없다면 새로 만들기
        await addDoc(collection(db, "XrayResults"), {
            'userID': user.uid,
            'date': Timestamp.now(),
            'healthy': result["건강함"],
            'covid-19': result["코로나-19"],
            'viral pneumonia': result["바이러스성 폐렴"],
            'bacterial pneumonia': result["박테리아성 폐렴"]
        });
    }

}



// 날짜를 yyyy-MM-dd 형식으로 바꿔줌
function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// yyyy-MM-dd 날짜를 넣으면 그 날의 시작 시간 Date와 끝나는 시간 Date를 반환함
function getStartEndTimestamp(date: string) {
    const startTime = new Date(date);
    const endTime = new Date(date);
    // Set up start date
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    endTime.setHours(23);
    endTime.setMinutes(59);
    endTime.setSeconds(59);

    return [Timestamp.fromDate(startTime), Timestamp.fromDate(endTime)];
}
'use client'
import { initializeApp } from "firebase/app";
import { Firestore } from "@firebase/firestore/lite";
import { getFirestore, collection, getDocs, setDoc, doc, Timestamp, query, where, addDoc, orderBy, limit } from 'firebase/firestore/lite';
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

// 대시보드에 필요한 데이터를 반환함
export async function getDashboardData(user: User | null) {
    if (user === null) {
        // 로그인 안 했으면 바로 리턴
        return;
    };

    const DashboardData = [];
    const { startDate, lastDate }: {
        startDate: Date | null,
        lastDate: Date | null
    } = await getStartAndLastDate(user);
    const diagnosisHistory: {  // { 건강함: 97, 코로나: 2, ... } 만듦
        [key: string]: number;
    } = {};

    if (startDate === null || lastDate === null) {
        return;    // 시작 날짜 혹은 마지막 날짜가 존재하지 않을 경우 반환
    }

    // 기간 만큼 반복함
    for (
        let indexDate = startDate;
        indexDate <= lastDate;
        indexDate.setDate(indexDate.getDate() + 1)
        
    ) {
        const formatedDate = formatDate(new Date(indexDate));

        // 날짜와 같은 메모라이즈 문서들을 가져와서 forEach로 반복함
        const MemorizeDocs = getMemorizeDocs(formatedDate);
        (await MemorizeDocs).forEach(async memorizeDoc => {
            const docRef = doc(db, "Users", memorizeDoc.data().user.id)
            const userData = (await getDoc(docRef)).data();

            // 각 메모라이즈 문서의 개수만큼 해당 유저의 값을 1 증가시킴
            for (let userName in usersName) {
                if (userName === userData?.name) {
                    usersName[userName]++;
                }
            }
        })

        DashboardData.push({ name: formatedDate, /*...usersName*/ })
    }

    return DashboardData;
}


// 사진을 처음 올린 날과 마지막으로 올린 날을 반환함
async function getStartAndLastDate(user: User) {
    console.log("getStartAndLastDate 시작");

    const userQuery = query(
        collection(db, "Project"),
        where("user", "==", user.uid),
    );
    const userDocs = (await getDocs(userQuery)).docs;

    if (userDocs.length === 0) {
        // 문서가 없는 경우 null 반환
        return { startDate: null, lastDate: null };
    }

    const { startDate, lastDate } = userDocs.reduce((acc, doc) => {
        const indexDate: Date = doc.data().date.toDate();
        console.log(`DB의 date: ${doc.data().date.toDate()}`);
        console.log(`인덱스 날짜: ${indexDate}`);

        // startDate 초기화
        if (acc.startDate) {
            acc.startDate = indexDate;
        }
        // lastDate 초기화
        if (!acc.lastDate) {
            acc.lastDate = indexDate;
        }

        // 현재 날짜가 startDate보다 이전인 경우 갱신
        if (indexDate < acc.startDate!) {
            acc.startDate = indexDate;
        }

        // 현재 날짜가 lastDate보다 이후인 경우 갱신
        if (indexDate > acc.lastDate!) {
            acc.lastDate = indexDate;
        }

        return acc;
    }, {
        startDate: null as Date | null,
        lastDate: null as Date | null,
    });

    console.log(`리턴 할 startDate, lastDate: ${startDate}, ${lastDate}`);

    return { startDate, lastDate }
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
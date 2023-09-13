// 파이어베이스
import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
    Timestamp,
    query,
    where,
    addDoc,
    orderBy,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore/lite';
// 로컬
import { ResultStateType } from "../main/Uploader";

const firebaseConfig = {
    apiKey: "AIzaSyBo_Y2kS9xkDcia9HdsnqFvAOJwM0Nvzms",
    authDomain: "ai-covid-19-tester.firebaseapp.com",
    projectId: "ai-covid-19-tester",
    storageBucket: "ai-covid-19-tester.appspot.com",
    messagingSenderId: "460362710464",
    appId: "1:460362710464:web:40478bf87274f2ef93dc25"
};

const app = initializeApp(firebaseConfig);
export default app;
const db = getFirestore(app);


// 결과를 DB에 저장함
export async function uploadResultData(user: User | null, result: ResultStateType, setUploadingToDB: { (valOrUpdater: boolean | ((currVal: boolean) => boolean)): void; (arg0: boolean): void; }) {
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
    setUploadingToDB(false)
};

// 대시보드에 필요한 데이터를 반환함
export async function getDashboardData(user: User | null) {
    if (user === null) {
        // 로그인 안 했으면 바로 리턴
        return;
    };

    const DashboardData = [];
    const userDocs = await getUserDocs(user);

    if (userDocs) {
        for (let doc of userDocs) {
            const data = doc.data(); // 문서 데이터 가져오기
            const formatedDate = formatDate(data.date.toDate());
            const resultState = {
                "건강함": data["healthy"],
                "코로나-19": data["covid-19"],
                "바이러스성 폐렴": data["viral pneumonia"],
                "박테리아성 폐렴": data["bacterial pneumonia"]
            }
            DashboardData.push({ name: formatedDate, ...resultState })
        }
    } else {
        // userDocs가 null일 경우 처리
        console.log("문서가 없습니다.");
        DashboardData.push({ name: "nothing" })
    }
    return DashboardData;
}

// 유저의 모든 문서를 날짜 기준 오름차순으로 반환함
async function getUserDocs(user: User) {
    console.log(user.uid)
    const userQuery = query(
        collection(db, "XrayResults"),
        where("userID", "==", user.uid),
        orderBy("date", "asc")
    );
    const userDocs = (await getDocs(userQuery)).docs;

    if (userDocs.length === 0) {
        // 문서가 하나도 없는 경우 null 반환
        return null;
    }

    return userDocs;
}


// 사진을 처음 올린 날과 마지막으로 올린 날을 반환함
async function getFirstAndLastDate(userDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null) {
    if (!userDocs || userDocs.length === 0) {
        // 문서가 없거나 빈 배열인 경우 null 반환
        return [null, null];
    }

    const firstDate = userDocs[0].data().date.toDate();
    const lastDate = userDocs[userDocs.length - 1].data().date.toDate();

    return [firstDate, lastDate];
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
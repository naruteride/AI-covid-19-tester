"use client"
// import '@/app/components/Firebase';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';



// ****************************************************************
// 파이어베이스 Auth - 시작
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_K--t3XLntBTN_NWsR7rhIf_B2Fec5Fk",
    authDomain: "ai-covid-19-21657.firebaseapp.com",
    projectId: "ai-covid-19-21657",
    storageBucket: "ai-covid-19-21657.appspot.com",
    messagingSenderId: "402886386383",
    appId: "1:402886386383:web:3857ce748855a0ea48cdba"
};

const app = initializeApp(firebaseConfig);

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


// 구글 팝업 로그인 테스트: 안 됨
// const provider = new GoogleAuthProvider();
// const auth = getAuth(app);
// signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)

//         console.log("SUCCESS! =========================");
//         console.log(`credential: ${credential}`);
//         console.log(`token: ${token}`);
//         console.log(`user: ${user}`);
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);

//         console.log("ERROR! *************************");
//         console.log(`errorCode: ${errorCode}`);
//         console.log(`errorMessage: ${errorMessage}`);
//         console.log(`email: ${email}`);
//         console.log(`credential: ${credential}`);
//     });


// 깃허브 팝업 로그인: 안 됨
// const provider = new GithubAuthProvider();
// const auth = getAuth(app);
// signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = GithubAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         console.log("SUCCESS! =========================");
//         console.log(`credential: ${credential}`);
//         console.log(`token: ${token}`);
//         console.log(`user: ${user}`);
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GithubAuthProvider.credentialFromError(error);
//         console.log("ERROR! *************************");
//         console.log(`errorCode: ${errorCode}`);
//         console.log(`errorMessage: ${errorMessage}`);
//         console.log(`email: ${email}`);
//         console.log(`credential: ${credential}`);
//     });


// 이메일 로그인:
const auth = getAuth(app);
const email = "slimejam01@gmail.com";
const password = "ssss1llll2iiii3";
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    console.log("SUCCESS! =========================");
    console.log(`user: ${user}`)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.log("ERROR! *************************");
    console.log(`errorCode: ${errorCode}`)
    console.log(`errorMessage: ${errorMessage}`)
  });


// 파이어베이스 Auth - 끝
// ****************************************************************





const noto_sans_KR = Noto_Sans_KR({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AI covid 19 Tester',
    description: 'AI covid 19 Tester',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <head>

            </head>
            <body className={noto_sans_KR.className}>
                <Header />
                <Navigator />
                {children}
                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" defer></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js" defer></script>
            </body>
        </html>
    )
}

import './globals.css';
import type { Metadata } from 'next';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_K--t3XLntBTN_NWsR7rhIf_B2Fec5Fk",
    authDomain: "ai-covid-19-21657.firebaseapp.com",
    projectId: "ai-covid-19-21657",
    storageBucket: "ai-covid-19-21657.appspot.com",
    messagingSenderId: "402886386383",
    appId: "1:402886386383:web:3857ce748855a0ea48cdba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
    .then((result) => {
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
    });


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
                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
            </body>
        </html>
    )
}

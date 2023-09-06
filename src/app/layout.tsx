'use client';
// 파이어베이스
import '@/app/components/Firebase';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// 리코일
import { RecoilRoot, useSetRecoilState } from 'recoil';
// Next.js
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
// 로컬 컴포넌트
import { userState } from '@/app/components/Auth';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';
import './globals.css';
import { useEffect } from 'react';

// 폰트 설정
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

    const auth = getAuth();
    const setUserState = useSetRecoilState(userState);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, user => {
    //         if (user) {
    //             setUserState(user);
    //         }
    //         // setIsLoading(false);
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    onAuthStateChanged(auth, (user: User | null) => {
        setUserState(user);
        console.log(`현재 로그인 상태: ${JSON.stringify(user)}`)
    })


    return (
        <html lang="ko">
            <head>

            </head>
            <body className={noto_sans_KR.className}>
                <RecoilRoot>
                    {

                    }
                    <Header />
                    <Navigator />
                    {children}
                </RecoilRoot>
                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" defer></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js" defer></script>
            </body>
        </html>
    )
}

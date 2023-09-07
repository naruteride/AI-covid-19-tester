'use client';
// 파이어베이스
import '@/app/components/Firebase';
// 리코일
import { RecoilRoot } from 'recoil';
// 넥스트
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
// 로컬 컴포넌트
import Auth from './components/Auth';
import Header from '@/app/components/Header';
import Navigator from '@/app/components/Navigator';
import './globals.css';

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

    return (
        <html lang="ko">
            <head>

            </head>
            <body className={noto_sans_KR.className}>
                <RecoilRoot>
                    <Auth />
                    <Header />
                    <Navigator />
                    {/* 로그인 되어있지 않으면 메인 페이지를 보여주지 않게 하고싶음 */}
                    {children}
                </RecoilRoot>
                <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" defer></script>
            </body>
        </html>
    )
}

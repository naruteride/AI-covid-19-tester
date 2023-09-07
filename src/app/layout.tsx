// 넥스트
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
// 로컬 컴포넌트
import './globals.css';
import RecoilRootContainer from './RecoilRootContainer';

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
            <body className={noto_sans_KR.className}>
                <RecoilRootContainer>{children}</RecoilRootContainer>
            </body>
        </html>
    )
}

// 'use client'
import Link from 'next/link';
import "./Navigator.css";
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/app/components/Auth';

export const navigatorActivate = atom<boolean>({
    key: 'navigatorActivate',
    default: false,
})

export default function Navigator(): React.ReactElement {
    const user = useRecoilValue(userState)
    const activate = useRecoilValue(navigatorActivate);

    return <>
        <nav className={activate ? 'activate' : ''}>
            <h3>
                네비게이터
            </h3>
            <ul>
                <Link href="/#uploader">
                    <li>AI 코로나 측정기</li>
                </Link>
                <Link href="/#dashboard">
                    <li>대시보드</li>
                </Link>
                {user ? <>
                    <Link href="/sign/out">
                        <li>로그아웃</li>
                    </Link>
                </> : <>
                    <Link href="/sign/in">
                        <li>로그인</li>
                    </Link>
                    <Link href="/sign/up">
                        <li>회원가입</li>
                    </Link>
                </>}

            </ul>
        </nav>
        <Background />
    </>
}



function Background() {
    const [activate, setActivate] = useRecoilState(navigatorActivate);
    return <div
        id='background'
        className={activate ? 'activate' : ''}
        onClick={() => setActivate(false)}
    />
}
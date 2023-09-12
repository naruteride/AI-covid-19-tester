// 'use client'
import Link from 'next/link';
import "./Navigator.css";
import { useRecoilValue } from 'recoil';
import { userState } from '@/app/components/Auth';

export default function Navigator(): React.ReactElement {
    const user = useRecoilValue(userState)

    return <>
        <nav>
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
    </>
}
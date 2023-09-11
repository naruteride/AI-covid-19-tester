// 'use client'
import Link from 'next/link';
import "./Navigator.css";

export default function Navigator(): React.ReactElement {
    return <>
        <nav>
            <h3>
                네비게이터
            </h3>
            <ul>
                <Link href="./#uploader">
                    <li>AI 코로나 측정기</li>
                </Link>
                <Link href="./#dashboard">
                    <li>대시보드</li>
                </Link>
            </ul>
        </nav>
    </>
}
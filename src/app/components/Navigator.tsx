import Link from 'next/link';

export default function Navigator(): React.ReactElement {
    return <>
        <nav>
            <h3>
                분류
            </h3>
            <ul>
                <Link href="./">
                    <li>전체</li>
                </Link>
                <Link href="./">
                    <li>니파 유데미 학습 일지</li>
                </Link>
            </ul>
        </nav>
    </>
}
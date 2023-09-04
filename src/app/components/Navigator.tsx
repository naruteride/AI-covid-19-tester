import Link from 'next/link';

export default function Navigator(): React.ReactElement {
    return <>
        <nav>
            <h3>
                네비게이터
            </h3>
            <ul>
                <Link href="./">
                    <li>섹션 1</li>
                </Link>
                <Link href="./">
                    <li>섹션 2</li>
                </Link>
            </ul>
        </nav>
    </>
}
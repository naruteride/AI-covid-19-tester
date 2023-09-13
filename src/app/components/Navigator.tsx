// 넥스트
import Link from 'next/link';
// 리코일
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// 로컬
import { userState } from '@/app/components/Auth';
import "./Navigator.css";

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
                {
                    (user)
                        ? <>
                            <NavItem href='/#uploader' name='AI 코로나 측정기' />
                            <NavItem href='/#dashboard' name='대시보드' />
                            <NavItem href='/sign/out' name='로그아웃' />
                        </>
                        : <>
                            <NavItem href='/sign/in' name='로그인' />
                            <NavItem href='/sign/up' name='회원가입' />
                        </>
                }
            </ul>
        </nav>
        <Background />
    </>
}

function NavItem({ href, name }: { href: string, name: string }) {
    const setActivate = useSetRecoilState(navigatorActivate)

    return <>
        <Link href={href} onClick={() => setActivate(false)}>
            <li>{name}</li>
        </Link>
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
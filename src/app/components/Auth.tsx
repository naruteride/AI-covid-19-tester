import { atom, useSetRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from 'next/navigation';

// 리코일 아톰
export const userState = atom({
    key: 'userState',
    default: null,
    dangerouslyAllowMutability: true,
});

// 로그인 상태관리
export default function Auth(): null {
    const auth = getAuth();
    const router = useRouter();
    const pathname = usePathname();
    const setUserState = useSetRecoilState(userState);

    // 로그인 여부 검사
    onAuthStateChanged(auth, (user: User | null) => {
        console.log(`현재 로그인 상태: ${JSON.stringify(user)}`);
        if (user === null && !pathname.startsWith('/sign/')) {
            // 로그인 되어있지 않으면, 로그인 창으로 보내버림
            router.replace(`/sign/in`);
        } else {
            // 로그인 되어있음.
            
        }
    })

    return (null);
}
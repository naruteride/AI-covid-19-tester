'use client';
// 파이어베이스
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
// 리코일
import { useSetRecoilState } from 'recoil';
// 넥스트
import { useRouter } from 'next/navigation';
// 리엑트
import { useRef } from "react";
// 로컬 컴포넌트
import app from '@/app/components/Firebase';
import { userState } from "@/app/components/Auth";


export default function SignIn({ params }: { params: { id: string } }): React.ReactElement {
    const auth = getAuth(app);
    const Router = useRouter();
    const setUserState = useSetRecoilState(userState);

    if (params.id !== 'in' && params.id !== 'up' && params.id !== 'out') {
        Router.replace(`/sign/in`);
    }

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    // 서브밋 버튼 누르면 발동
    const handleSignIn = async () => {
        if (
            inputEmailRef.current?.value !== undefined &&
            inputPasswordRef.current?.value !== undefined
        ) {
            if (params.id === 'in') {
                // 로그인
                await signInWithEmailAndPassword(auth, inputEmailRef.current.value, inputPasswordRef.current.value)
                    .then((userCredential) => {
                        // 로그인 성공
                        const user = userCredential.user;
                    })
                    .catch((error) => {
                        // 로그인 실패
                        console.log("ERROR! *************************");
                        console.log(`errorCode: ${error.code}`);
                        console.log(`errorMessage: ${error.message}`);
                    });

            } else if (params.id === 'up') {
                // 회원가입
                await createUserWithEmailAndPassword(auth, inputEmailRef.current.value, inputPasswordRef.current.value)
                    .then((userCredential) => {
                        // 회원가입 성공
                        const user = userCredential.user;
                    })
                    .catch((error) => {
                        // 회원가입 실패
                        console.log("ERROR! *************************");
                        console.log(`errorCode: ${error.code}`);
                        console.log(`errorMessage: ${error.message}`);
                    });
            } else if (params.id === 'out') {
                // 로그아웃
                // ...
            }

            // 로그인 이후 처리
            if (auth.currentUser) {
                setUserState(auth.currentUser);
                Router.replace(`/`);
            }
        } else {
            console.log("이메일 혹은 비밀번호를 입력해주세요.");
        }
    }


    return <>
        <label htmlFor="email">
            이메일
            <input
                type="text"
                id="email"
                name="email"
                placeholder="이메일"
                ref={inputEmailRef}
            />
        </label>
        <label htmlFor="password">
            비밀번호
            <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                ref={inputPasswordRef}
            />
        </label>

        <button onClick={handleSignIn} type="submit">
            {params.id === 'in' ? '로그인' : '회원가입'}
        </button>
    </>
}
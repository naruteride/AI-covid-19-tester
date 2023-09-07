'use client';
// 파이어베이스
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
// 넥스트
import { useRouter } from 'next/navigation';
// 리엑트
import { useRef } from "react";
// 로컬 컴포넌트
import app from '@/app/components/Firebase';


export default function SignIn({ params }: { params: { id: string } }): React.ReactElement {
    const auth = getAuth(app);
    const Router = useRouter();

    if (params.id === 'out') {
        // 로그아웃
        console.log("로그아웃 시도!")
        signOut(auth).then(() => {
            // 로그아웃 성공
            console.log("로그아웃 성공");
        }).catch((error) => {
            // 로그아웃 실패
            console.log("로그아웃 실패");
            console.log(error);
        });
    } else if (params.id !== 'in' && params.id !== 'up') {
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
                        // const user = userCredential.user;
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
                        // const user = userCredential.user;
                    })
                    .catch((error) => {
                        // 회원가입 실패
                        console.log("ERROR! *************************");
                        console.log(`errorCode: ${error.code}`);
                        console.log(`errorMessage: ${error.message}`);
                    });
            } else {
                console.log('로그인 과정에서 에러 발생!');
                console.log('에러 코드: 1');
            }

            // 로그인 or 회원가입 이후 처리
            if (auth.currentUser) {
                Router.replace(`/`);
            }
        } else {
            console.log("이메일 혹은 비밀번호를 입력해주세요.");
        }
    }


    return <>
        <main>
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
        </main>
    </>
}
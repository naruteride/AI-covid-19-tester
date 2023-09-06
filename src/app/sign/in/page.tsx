'use client';
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useRef } from "react";
import app from '@/app/components/Firebase'

export default function SignIn(): React.ReactElement {
    const auth = getAuth(app);

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const handleSignIn = async () => {
        if (
            inputEmailRef.current?.value !== undefined &&
            inputPasswordRef.current?.value !== undefined
        ) {
            // 파이어베이스 로그인
            await signInWithEmailAndPassword(auth, inputEmailRef.current.value, inputPasswordRef.current.value)
                .then((userCredential) => {
                    // 로그인 성공

                    const user = userCredential.user;

                    console.log("SUCCESS! =========================");
                    console.log(`user: ${JSON.stringify(user)}`);
                })
                .catch((error) => {
                    // 로그인 실패

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log("ERROR! *************************");
                    console.log(`errorCode: ${errorCode}`);
                    console.log(`errorMessage: ${errorMessage}`);
                });

            // 로그인 이후 처리
            // if (auth.user) {
            //     setAuth(auth.user);
            //     history.push('/');
            // }
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
            로그인
        </button>
    </>
}
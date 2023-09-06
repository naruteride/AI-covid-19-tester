'use client';
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { useRef } from "react";
import app from '@/app/components/Firebase';
// import { redirect, useRouter } from 'next/navigation';

export default function SignUp(): React.ReactElement {
    const auth = getAuth(app);

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const handleSignUp = async () => {
        if (
            inputEmailRef.current?.value !== undefined &&
            inputPasswordRef.current?.value !== undefined
        ) {
            // 파이어베이스 회원가입
            await createUserWithEmailAndPassword(auth, inputEmailRef.current.value, inputPasswordRef.current.value)
                .then((userCredential) => {
                    // 회원가입 성공

                    const user = userCredential.user;

                    console.log("SUCCESS! =========================");
                    console.log(`user: ${JSON.stringify(user)}`);
                })
                .catch((error) => {
                    // 회원가입 실패

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log("ERROR! *************************");
                    console.log(`errorCode: ${errorCode}`);
                    console.log(`errorMessage: ${errorMessage}`);
                });

            // 회원가입 이후 처리
            if (auth.currentUser) {
                console.log(`회원가입 성공: ${JSON.stringify(auth.currentUser)}`);
                // redirect('/');   // 왜 안 되지?
                // useRouter().replace(`/`);   // 함수의 몸체에서만 사용 가능
                window.location.replace(`/`);
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

        <button onClick={handleSignUp} type="submit">
            회원가입
        </button>
    </>
}

// 구글 팝업 로그인 테스트: 안 됨
// const provider = new GoogleAuthProvider();
// const auth = getAuth(app);
// signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)

//         console.log("SUCCESS! =========================");
//         console.log(`credential: ${credential}`);
//         console.log(`token: ${token}`);
//         console.log(`user: ${user}`);
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);

//         console.log("ERROR! *************************");
//         console.log(`errorCode: ${errorCode}`);
//         console.log(`errorMessage: ${errorMessage}`);
//         console.log(`email: ${email}`);
//         console.log(`credential: ${credential}`);
//     });


// 깃허브 팝업 로그인: 안 됨
// const provider = new GithubAuthProvider();
// const auth = getAuth(app);
// signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = GithubAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         console.log("SUCCESS! =========================");
//         console.log(`credential: ${credential}`);
//         console.log(`token: ${token}`);
//         console.log(`user: ${user}`);
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GithubAuthProvider.credentialFromError(error);
//         console.log("ERROR! *************************");
//         console.log(`errorCode: ${errorCode}`);
//         console.log(`errorMessage: ${errorMessage}`);
//         console.log(`email: ${email}`);
//         console.log(`credential: ${credential}`);
//     });

'use client';
// 파이어베이스
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    AuthError
} from 'firebase/auth';
// 넥스트
import { useRouter } from 'next/navigation';
// 리엑트
import { useRef } from 'react';
// 로컬 컴포넌트
import app from '@/app/components/Firebase';
import styles from './Sign.module.css'
import { useResetRecoilState } from 'recoil';
import { resultState } from '@/app/main/Uploader';
import { enqueueSnackbar } from 'notistack'

export default function Sign({ params }: { params: { id: string } }): React.ReactElement {
    const auth = getAuth(app);
    const Router = useRouter();
    const resetResult = useResetRecoilState(resultState);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const inputPasswordCheckRef = useRef<HTMLInputElement>(null);
    let submitText: string = params.id;

    if (params.id === 'in') {   // 로그인
        submitText = '로그인';
    } else if (params.id === 'up') {    // 회원가입
        submitText = '회원가입';
    } else if (params.id === 'out') {   // 로그아웃
        submitText = '로그아웃';
        resetResult();
        signOut(auth)
            .then(() => {
                // 로그아웃 성공
                enqueueSnackbar('로그아웃 성공!', { variant: 'success' });
                Router.push('/sign/in');
            })
            .catch((error) => {
                // 로그아웃 실패
                enqueueSnackbar('로그아웃 실패!', { variant: 'error' });
                console.log(error);
            });
    } else {
        // path가 in, up, out 중 하나가 아니라면, in으로 보내버림
        Router.replace('/sign/in');
    }


    // 서브밋 버튼 누르면 발동
    const handleSubmit = async (event: any) => {
        event.preventDefault(); // form의 action을 막음
        const email = inputEmailRef.current?.value;
        const password = inputPasswordRef.current?.value;

        if (email && password) {
            try {
                if (params.id === 'in') {   // 로그인
                    await signInWithEmailAndPassword(auth, email, password);
                    enqueueSnackbar('로그인 성공!', { variant: 'success' });

                } else if (params.id === 'up') {    // 회원가입
                    const passwordCheck = inputPasswordCheckRef.current?.value;
                    if (password === passwordCheck) {   // 비밀번호와 비밀번호 확인이 일치하는지 검사
                        // 일치함
                        await createUserWithEmailAndPassword(auth, email, password);
                        enqueueSnackbar('회원가입 성공!', { variant: 'success' });
                    } else {
                        // 일치하지 않음
                        enqueueSnackbar('비밀번호와 비밀번호 확인이 일치하지 않습니다.', { variant: 'error' });
                    }
                } else if (params.id === 'out') {   // 로그아웃
                    // 로그아웃 페이지에서 로딩이 다 끝나기 전에 서브밋 버튼을 누름
                    enqueueSnackbar('로그아웃 중입니다. 조금만 기다려주세요!');
                }

                if (auth.currentUser) {
                    // 로그인 or 회원가입 이후 처리
                    Router.replace(`/`);
                }
            } catch (error) {
                const firebaseError = error as AuthError;
                switch (firebaseError.code) {
                    case 'auth/user-not-found':
                        enqueueSnackbar('이메일을 다시 입력해주세요.', { variant: 'error' });
                        break;
                    case 'auth/wrong-password':
                        enqueueSnackbar('비밀번호를 다시 입력해주세요.', { variant: 'error' });
                        break;
                    case 'auth/email-already-in-use':
                        enqueueSnackbar('이미 사용 중인 이메일입니다.', { variant: 'error' });
                        break;
                    case 'auth/weak-password':
                        enqueueSnackbar('비밀번호가 너무 쉽습니다!', { variant: 'error' });
                        break;
                    case 'auth/claims-too-large':
                        enqueueSnackbar('이메일 혹은 비밀번호가 너무 깁니다.', { variant: 'error' });
                        break;
                    default:
                        enqueueSnackbar('알 수 없는 로그인 오류가 발생했습니다!', { variant: 'error' });
                        console.log('Sign 에러 발생:', JSON.stringify(firebaseError));
                        break;
                }
            }
        } else {
            enqueueSnackbar('이메일 혹은 비밀번호를 입력해주세요.', { variant: 'error' });
        }
    }


    return <>
        <main>
            <section id='sign' className={styles.sign}>
                <h1>{submitText}</h1>
                <br /><br />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h3>{submitText} 폼</h3>
                    <InputLabel type={'email'} placeholder={'user@example.com'} reference={inputEmailRef} />
                    <InputLabel type={'password'} placeholder={'user1234'} reference={inputPasswordRef} />
                    {
                        params.id === 'up'
                            ? <InputLabel type={'password-check'} placeholder={'user1234'} reference={inputPasswordCheckRef} />
                            : ''
                    }
                    <button type='submit' className={styles.submit}>
                        {submitText}
                    </button>
                </form>
            </section>
        </main>
    </>
}

function InputLabel({ type, placeholder, reference }: { type: string, placeholder: string, reference: React.Ref<HTMLInputElement> }) {
    const korean: {
        'email': string;
        'password': string;
        'password-check': string;
        [key: string]: string;
    } = {
        'email': '이메일',
        'password': '비밀번호',
        'password-check': '비밀번호 확인'
    }
    return <>
        <label htmlFor={type}>
            {korean[type]}
            <input
                type={
                    type === 'password-check'
                        ? 'password'
                        : type
                }
                id={type}
                name={type}
                placeholder={placeholder}
                ref={reference}
            />
        </label>
    </>
}
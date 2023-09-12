'use client'
// 파이어베이스
import { User } from 'firebase/auth';
// 리코일
import { atom, useRecoilState, useRecoilValue } from 'recoil';
// 리액트
import React, { useEffect, useRef, useState } from 'react';
// 로컬
import { enqueueSnackbar } from 'notistack';
import { uploadResultData } from '@/app/components/Firebase';
import { updateImageDisplay } from '@/app/components/Tensorflow';
import { userState } from '@/app/components/Auth';
import ResultSheet from './ResultSheet';
import "@/app/components/cssprogress.css";
import styles from './page.module.css';

export type ResultStateType = {
    '건강함': number;
    '코로나-19': number;
    '바이러스성 폐렴': number;
    '박테리아성 폐렴': number;
    [key: string]: number;
};

// resultState의 기본값
const resultStateDefaultData = {
    '건강함': 0,
    '코로나-19': 0,
    '바이러스성 폐렴': 0,
    '박테리아성 폐렴': 0,
}

// 리코일 아톰: 검사 결과를 저장함
export const resultState = atom<ResultStateType>({
    key: 'resultState',
    default: { ...resultStateDefaultData },
    dangerouslyAllowMutability: true,
});

// 사진를 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const [result, setResult] = useRecoilState(resultState);
    const board = useRef(null);
    const [loading, setLoading] = useState(false);
    const user: User | null = useRecoilValue(userState);

    // 검사 보드에 사진가 변경되면 작동
    const handleImageChange = async (event: { target: HTMLInputElement; }) => {
        // 로딩 시작
        setLoading(true);
        enqueueSnackbar('엑스레이 사진 검사 중...');

        // 검사 보드에 사진 업로드 및 모델에 사진 전송
        const prediction = await updateImageDisplay(board.current!, event.target);

        // 검사 결과를 리코일에 저장
        setResult({
            '건강함': prediction[0].probability.toFixed(2) * 100,
            '코로나-19': prediction[1].probability.toFixed(2) * 100,
            '바이러스성 폐렴': prediction[2].probability.toFixed(2) * 100,
            '박테리아성 폐렴': prediction[3].probability.toFixed(2) * 100,
        })
    }

    // result 값이 바뀔 때마다 실행
    useEffect(() => {
        const isDefaultResult = JSON.stringify(result) === JSON.stringify(resultStateDefaultData);

        async function fetchData() {
            // 검사 결과를 DB에 저장
            await uploadResultData(user, result);
            setLoading(false);  // 로딩 끝
            enqueueSnackbar('검사 완료!', { variant: 'success' });
        }

        if (!isDefaultResult) { // result의 값이 기본값이라면 업로드 하지 않음.
            fetchData();
        }
    }, [result]);

    return <>
        <section id="uploader" className={styles.uploader}>
            <h1>AI 코로나 측정기</h1>
            <p>흉부 엑스레이 사진을 업로드 해주세요.</p>
            <br /><br />

            <div className={styles.inspection}>
                {/* 엑스레이 검사 보드 */}
                <label ref={board} htmlFor='image' className={styles.board}>
                    <div className={styles.line}>
                        <div className={styles.aim}></div>
                    </div>
                    <input onChange={handleImageChange} className={styles.inputFile} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
                </label>

                <ResultSheet loading={loading} setLoading={setLoading} />    {/* 검사 결과 시트 */}
            </div>


        </section>
    </>
}
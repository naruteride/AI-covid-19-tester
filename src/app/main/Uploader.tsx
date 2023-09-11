'use client'
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styles from './page.module.css';
import React, { useEffect, useRef, useState } from 'react';
import "@/app/components/cssprogress.css";
import ResultSheet from './ResultSheet';
import { updateImageDisplay } from '@/app/components/Tensorflow';
import { uploadResultData } from '../components/Firebase';
import { userState } from '../components/Auth';
import { User } from 'firebase/auth';

export type ResultStateType = {
    '건강함': number;
    '코로나-19': number;
    '바이러스성 폐렴': number;
    '박테리아성 폐렴': number;
    [key: string]: number;
};

// 리코일 아톰: 검사 결과를 저장함
export const resultState = atom<ResultStateType>({
    key: 'resultState',
    default: {
        '건강함': 0,
        '코로나-19': 0,
        '바이러스성 폐렴': 0,
        '박테리아성 폐렴': 0,
    },
    dangerouslyAllowMutability: true,
});

// 이미지 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const [result, setResult] = useRecoilState(resultState);
    const board = useRef(null);
    const [loading, setLoading] = useState(false);
    const user: User | null = useRecoilValue(userState);

    // 검사 판에 이미지가 변경되면 작동
    const handleImageChange = async (event: { target: HTMLInputElement; }) => {
        // 로딩 시작
        setLoading(true);

        // 검사 판에 이미지 업로드 및 모델에 이미지 전송
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
        // 검사 결과를 DB에 저장
        async function fetchData() {
            await uploadResultData(user, result);
            setLoading(false);  // 로딩 끝
        }

        fetchData();
    }, [result]);

    return <>
        <section id="uploader" className={styles.uploader}>
            <h1>AI 코로나 측정기</h1>
            <p>흉부 엑스레이 사진을 업로드 해주세요.</p>
            <br /><br />

            <div className={styles.inspection}>
                {/* 엑스레이 검사 판 */}
                <label ref={board} htmlFor='image' className={styles.board}>
                    <div className={styles.line}>
                        <div className={styles.aim}></div>
                    </div>
                </label>

                <ResultSheet loading={loading} setLoading={setLoading} />    {/* 검사 결과 시트 */}
            </div>

            <div className={styles.inputFileContainer}>
                <input onChange={handleImageChange} className={styles.inputFile} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
            </div>
        </section>
    </>
}
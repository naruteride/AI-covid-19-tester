'use client'
import { atom, useRecoilState } from 'recoil';
import styles from './page.module.css';
import React, { useRef } from 'react';
import "@/app/components/cssprogress.css";
import ResultSheet from './ResultSheet';
import { updateImageDisplay } from '@/app/components/Tensorflow';

// 리코일 아톰: 검사 결과를 저장함
export const resultState = atom<Object>({
    key: 'resultState',
    default: {
        Healthy: 0,
        covid19: 0,
        ViralPneumonia: 0,
        BacterialViralPneumonia: 0,
    },
    dangerouslyAllowMutability: true,
});

// 이미지 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const [result, setResult] = useRecoilState(resultState);
    const board = useRef(null);

    // 검사 판에 이미지가 변경되면 작동
    const handleImageChange = async (event: { target: HTMLInputElement; }) => {
        // 검사 판에 이미지 업로드 및 모델에 이미지 전송
        const prediction = await updateImageDisplay(board.current!, event.target);
        
        
        console.log(prediction);


        // 검사 결과를 리코일에 저장
        setResult({
            Healthy: prediction[0].probability.toFixed(2) * 100,
            covid19: prediction[1].probability.toFixed(2) * 100,
            ViralPneumonia: prediction[2].probability.toFixed(2) * 100,
            BacterialViralPneumonia: prediction[3].probability.toFixed(2) * 100,
        })
        console.log(result);

    }

    return <>
        <section className={styles.uploader}>
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

                <ResultSheet />    {/* 검사 결과 시트 */}
            </div>

            <input onChange={handleImageChange} className={styles.button} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
        </section>
    </>
}

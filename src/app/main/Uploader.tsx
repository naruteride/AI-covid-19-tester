'use client'
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '@/app/components/Auth';
import styles from './page.module.css';
import React, { useEffect, useRef, useState } from 'react';
import "@/app/components/cssprogress.css";
import ResultSheet from './ResultSheet';
import { updateImageDisplay } from '@/app/components/Tensorflow';

// 이미지 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const user = useRecoilValue(userState);
    const board = useRef(null);

    const handleImageChange = (event: { target: HTMLInputElement; }) => {
        updateImageDisplay(board.current!, event.target);
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
                <ResultSheet />
            </div>

            <input onChange={handleImageChange} className={styles.button} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
        </section>
    </>
}

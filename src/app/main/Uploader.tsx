'use client'
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '@/app/components/Auth';
import styles from './page.module.css';
import React, { useEffect, useRef } from 'react';
import "@/app/components/cssprogress.css";
import ResultSheet from './ResultSheet';
import { updateImageDisplay } from '@/app/components/Tensorflow';

// 이미지 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const user = useRecoilValue(userState);
    const imageFile = useRef(null);

    return <>
        <section className={styles.uploader}>
            <h1>AI 코로나 측정기</h1>
            <p>흉부 엑스레이 사진을 업로드 해주세요.</p>
            <br /><br />

            <div className={styles.inspection}>
                <Board imageFile={imageFile} />
                <ResultSheet />
            </div>

            <input ref={imageFile} className={styles.button} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
        </section>
    </>
}

// 엑스레이 검사 판
function Board({ imageFile }: { imageFile: React.MutableRefObject<null> }): React.ReactElement {
    const board = useRef();

    useEffect(() => {
        updateImageDisplay(board.current, imageFile.current );
    }, [imageFile.current])

    return <>
        <label ref={board} htmlFor='image' className={styles.board}>
            <div className={styles.line}>
                <div className={styles.aim}></div>
            </div>
        </label>
    </>
}


'use client'
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from './components/Auth';
import styles from './page.module.css';
import React from 'react';
import "@/app/components/cssprogress.css";

// 이미지 올리고, 검사 결과 받는 컴포넌트
export default function Uploader(): React.ReactElement {
    const TFURL = "https://teachablemachine.withgoogle.com/models/D0oa8NKP_/";
    const user = useRecoilValue(userState);

    return <>
        <section className={styles.uploader}>
            <h1>AI 코로나 측정기</h1>
            <p>흉부 엑스레이 사진을 업로드 해주세요.</p>
            <br /><br />

            <div className={styles.inspection}>
                <Board />
                <Result />
            </div>

            <input className={styles.button} type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
        </section>
    </>
}

// 엑스레이 검사 판
function Board(): React.ReactElement {
    return <>
        <label htmlFor='image' className={styles.board}>
            <div className={styles.line}>
                <div className={styles.aim}></div>
            </div>
        </label>
    </>
}

// 검사 결과 시트
function Result(): React.ReactElement {
    return <>
        <div className={styles.result}>
            <ProgressBar />
            <ProgressBar />
            <ProgressBar />
            <ProgressBar />
        </div>
    </>
}

function ProgressBar(): React.ReactElement {
    return <>
        <div className="cssProgress">
            <div className="progress2">
                <div
                    className="cssProgress-bar cssProgress-success cssProgress-active"
                    data-percent="65"
                    style={{
                        width: "65%", transition: "none 0s ease 0s"
                    }}>
                    <span className="cssProgress-label">65%</span>
                </div>
            </div>
        </div>
    </>
}
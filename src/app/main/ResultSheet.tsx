import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './page.module.css';
import { resultState, ResultStateType } from './Uploader';
import { useRecoilValue } from 'recoil';
import Loading from '../components/Loading';

// 검사 결과 시트
export default function ResultSheet({ loading, setLoading }: { loading: boolean, setLoading: Dispatch<SetStateAction<boolean>> }) {
    const resultSheet = useRecoilValue(resultState);
    const ProgressBars = [];

    for (let result in resultSheet) {
        ProgressBars.push(<ProgressBar type={result} value={resultSheet[result]} />)
    }

    return <>
        <div className={styles.resultSheet}>
            <h3>검사 결과</h3>
            {loading ? <Loading /> : ''}
            {ProgressBars}
        </div>
    </>
}

function ProgressBar({ type, value }: { type: string, value: number }): React.ReactElement {
    let color = ``;
    switch (type) {
        case '코로나-19':
            color = 'cssProgress-danger';
            break;
        case '바이러스성 폐렴':
            color = 'cssProgress-info';
            break;
        case '박테리아성 폐렴':
            color = 'cssProgress-success';
            break;
    }
    return <>
        <div className="cssProgress">
            {type}
            <div className="progress2">
                <div
                    className={`cssProgress-bar cssProgress-active ${color}`}
                    data-percent={value}
                    style={{
                        width: `${value}%`,
                    }}>
                    <span className="cssProgress-label">{value}%</span>
                </div>
            </div>
        </div>
    </>
}
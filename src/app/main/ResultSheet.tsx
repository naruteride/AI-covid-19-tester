import styles from './page.module.css';

// 검사 결과 시트
export default function ResultSheet() {

    return <>
        <div className={styles.resultSheet}>
            <h3>수치</h3>
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
                    data-percent="0"
                    style={{
                        width: "0%", transition: "none 0s ease 0s"
                    }}>
                    <span className="cssProgress-label">0%</span>
                </div>
            </div>
        </div>
    </>
}
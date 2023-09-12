'use client';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { getDashboardData } from "../components/Firebase"
import { useRecoilValue } from "recoil"
import { userState } from "../components/Auth"
import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { resultState } from "./Uploader";
import styles from "./page.module.css"
import Loading from "../components/Loading";

export default function Dashboard() {
    const user = useRecoilValue<User | null>(userState);
    const result = useRecoilValue(resultState)
    const [dashboardData, setDashboardData] = useState<{ name: string; }[]>([{ name: "" }]);
    const [waitForAwait, setWaitForAwait] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        console.log(windowWidth)
    }, [])

    async function fetchData() {
        if (user == null) {
            return;
        }
        const dashboard = await getDashboardData(user);

        if (dashboard !== undefined) {
            setDashboardData(dashboard);
        }
        setWaitForAwait(false);
    }

    useEffect(() => {
        setWaitForAwait(true);
        fetchData();
    }, [user, result, waitForAwait]);

    return <>
        <section id="dashboard" className={styles.dashboard}>
            <h1>대시보드</h1>
            <p>과거의 진단 기록과 변화 추이를 확인합니다.</p>
            <br /><br />
            {windowWidth
                ? <LineChart
                    width={windowWidth > 1200 ? 800 : windowWidth}
                    height={windowWidth > 1200 ? 400 : windowWidth / 2}
                    data={dashboardData}
                    margin={{ top: 5, right: 60, bottom: 5, left: 0 }}
                    className={styles.chart}
                >
                    <Line type="monotone" key={'건강함'} dataKey={'건강함'} stroke={'#3798d9'} />
                    <Line type="monotone" key={'코로나-19'} dataKey={'코로나-19'} stroke={'#ef5350'} />
                    <Line type="monotone" key={'바이러스성 폐렴'} dataKey={'바이러스성 폐렴'} stroke={'#9575cd'} />
                    <Line type="monotone" key={'박테리아성 폐렴'} dataKey={'박테리아성 폐렴'} stroke={'#66bb6a'} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                : <Loading />
            }
        </section>
    </>
}
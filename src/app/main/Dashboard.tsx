'use client';
// 파이어베이스
import { User } from "firebase/auth";
// 리코일
import { useRecoilState, useRecoilValue } from "recoil";
// 리액트
import { useEffect, useState } from "react";
// 리차트
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
// 로컬
import { getDashboardData } from "../components/Firebase";
import { userState } from "@/app/components/AuthProvider";
import { resultState, uploadingToDBState } from "./Uploader";
import styles from "./page.module.css";

export default function Dashboard() {
    const user = useRecoilValue<User | null>(userState);
    const result = useRecoilValue(resultState)
    const [dashboardData, setDashboardData] = useState<{ name: string; }[]>([{ name: "" }]);
    const [uploadingToDB, setUploadingToDB] = useRecoilState(uploadingToDBState);

    async function fetchData() {
        if (user == null) {
            return;
        }
        const dashboard = await getDashboardData(user);

        if (dashboard) {
            setDashboardData(dashboard);
        }
    }

    useEffect(() => {
        if (uploadingToDB == false) {
            fetchData();
        }
    }, [uploadingToDB, result, user]);

    return <>
        <section id="dashboard" className={styles.dashboard}>
            <h1>대시보드</h1>
            <p>과거의 진단 기록과 변화 추이를 확인합니다.</p>
            <br /><br />
            <LineChartContainer dashboardData={dashboardData} />
        </section>
    </>
}

function LineChartContainer({ dashboardData }: { dashboardData: { name: string }[] }) {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [])

    return <>
        <LineChart
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
    </>
}
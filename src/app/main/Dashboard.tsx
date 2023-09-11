'use client';
import { CartesianGrid, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { getDashboardData } from "../components/Firebase"
import { useRecoilValue } from "recoil"
import { userState } from "../components/Auth"
import { User } from "firebase/auth";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const user = useRecoilValue<User | null>(userState);
    const [dashboardData, setDashboardData] = useState<{ name: string; }[]>([{ name: "" }]);

    useEffect(() => {
        console.log(`Dashboard가 업마운트 됨`)
        async function fetchData() {
            if (user == null) {
                return;
            }

            console.log(`getDashboardData 실행 직전 줄`);
            const dashboard = await getDashboardData(user);
            console.log(`getDashboardData 실행 직후 줄`);

            if (dashboard !== undefined) {
                setDashboardData(dashboard);
            }
        }

        fetchData();
    }, []);

    return <>
        <section id="dashboard">
            <h1>대시보드</h1>

            {/* <LineChart width={800} height={400} data={dashboardData} margin={{ top: 5, right: 60, bottom: 5, left: 0 }}>
                {dashboardData.map((date, index) => {
                    return <Line type="monotone" key={date.name} dataKey={usersData[index]?.name} stroke={usersData[index]?.color} />
                })}

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart> */}

        </section>
    </>
}
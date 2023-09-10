import { CartesianGrid, LineChart, Tooltip, XAxis, YAxis } from "recharts"


export default function Dashboard() {

    

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
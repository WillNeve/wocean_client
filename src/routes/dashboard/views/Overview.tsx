import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../auth";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { Pie } from "react-chartjs-2";

type dataset= {
  label: string,
  data: string,
  backgroundColor: string[],
  borderColor?: string,
  borderWidth?: number
}

type pieChartData = {
  labels: string[],
  datasets: dataset[],
}

interface pieChartProps {
  chartData: pieChartData;
}

const PieChart: React.FC<pieChartProps> = ({ chartData }) => {
  return (
    <div className="w-full h-full">
      <h2 className="text-sm font-semibold " >Your notes at a glance</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Notes vs Folder Ratio"
            },
          },

        }}
      />
    </div>
  );
}

Chart.register(CategoryScale);

const Overview = () => {
  const [statsData, setStatsData] = useState<dataset | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const loadStats = async () => {
    if (user) {
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/stats`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
        }),
        new Promise<string>((res) => setTimeout(() => {
          res('Request timed out');
        }, 10000))
      ])
      if (resp instanceof Response) {
        if (resp.status === 200) {
          const data = await resp.json();
          console.log(data);
          const folderData = {
            labels: data.stats.fileRatios.labels,
            datasets: [
              {
                label: "Ratios",
                data: data.stats.fileRatios.data,
                backgroundColor: ["#047FB6","#023248"],
                borderWidth: 0,
              },
            ],
          }
          setStatsData(folderData as unknown as dataset);
        }
      } else {
        setTimedOut(true);
      }
      setLoaded(true);
    }
  }

  useEffect(() => {
    loadStats();
  }, [])

  return (
    <div className="h-full">
      (loaded ? (
        (timedOut ? (
          <p>sorry your request timed out</p>
        ) : (
          <>
          <div className="grid grid-cols-2 grid-rows-2">
            <div className="w-full h-full border border-gray-500 p-1">
              <PieChart chartData={statsData as dataset}/>
            </div>
            <div className="w-full h-full border border-gray-500 p-1">

            </div>
            <div className="w-full h-full border border-gray-500 p-1">

            </div>
            <div className="w-full h-full border border-gray-500 p-1">

            </div>
          </div>
          </>
        ))
      ) : (
        <p>Could not load stats</p>
      ))
    </div>
  )
}

export default Overview;

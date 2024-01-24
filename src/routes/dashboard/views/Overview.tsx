import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../auth";
import { LoaderGroup, LoaderRect } from "../../../styles/Utility";



type pieChartSegment = [label: string, value: string];

interface pieChartProps {
  pieChartData: pieChartSegment[],
}

const PieChart: React.FC<pieChartProps> = ({pieChartData}) => {
  const totalDataSize = pieChartData.reduce((acc: number, pieChartSegment: pieChartSegment) => acc + parseInt(pieChartSegment[1], 10), 0 )

  const colors = ['#023248', '#2ABBFB'];
  const strokeWidth = 15;
  const radius = 50 - strokeWidth / 2;
  const center = [50,50];
  const circumference = 2 * Math.PI * radius;

  let usedDegrees = 0;

  const makeCircleSegment = (dataSize: number, index: number) => {
    const dataFraction = dataSize / totalDataSize;
    const degrees = (360 * dataFraction);
    const offsetLength = (1 - dataFraction) * 2 * Math.PI * radius;
    const color = colors[index];
    const rotationOffset = usedDegrees;
    usedDegrees = usedDegrees + degrees
    return (
        <circle cx={center[0]} cy={center[1]} r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offsetLength}
                className={`relative origin-center opacity-50`}
                key={index}
                style={{transform: `rotate(${rotationOffset - 90}deg)`, fill: `transparent`}}>
        </circle>
    );
  }

  const innerWith = `${radius * 2}%`;
  console.log(innerWith);


  return (
      <div>
        <div className="flex items-center gap-x-4 flex-wrap">
          { pieChartData.map((data: pieChartSegment, index: number) => (
            <div key={index} className="flex items-center gap-x-2">
              <p className="text-sm"><strong className="font-medium">{data[1]}</strong> {data[0]}</p><div className="w-[15px] h-auto aspect-square opacity-50 border border-gray-500" style={{background: colors[index]}}></div>
            </div>
          )) }
        </div>
        <svg viewBox="0 0 100 100" className="relative z-10 flex-grow aspect-square p-2 w-fit" xmlns="http://www.w3.org/2000/svg">
          {pieChartData.map((pieChartData: pieChartSegment, index: number) => {
            return makeCircleSegment(parseInt(pieChartData[1], 10), index);
          }
          )}
        </svg>
      </div>
  );
}

type statsDataType = {
  files: {
    total: number,
    title: string,
    data: pieChartSegment[],
  }
};

const Overview = () => {
  const [statsData, setStatsData] = useState< statsDataType | null>(null);

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
          setStatsData(data.stats);
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
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-4">
      {loaded ? (
        (timedOut ? (
          <p>Sorry, your stats could not be loaded at this time.</p>
        ) : (

            <div className="w-full h-full flex flex-col">
              <div className="top">
                <h2 className="text-xl font-medium">Your Files</h2>
                <p>Total: <strong className="font-semibold text-waveLight-500">{statsData?.files.total}</strong></p>
              </div>
              <PieChart pieChartData={statsData?.files.data as unknown as pieChartSegment[]}/>
            </div>
        ))
      ) : (
        <>
        <div className="w-full h-full flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
              <LoaderRect className='w-full h-full rounded-sm'/>
            </LoaderGroup>

            <div className="w-full h-[15px] flex items-center gap-x-4">
              <LoaderGroup active={true} className={`w-[20%] h-full`}>
                <LoaderRect className='w-full h-full rounded-sm'/>
              </LoaderGroup>

              <LoaderGroup active={true} className={`w-[20%] h-full`}>
                <LoaderRect className='w-full h-full rounded-sm'/>
              </LoaderGroup>
            </div>
          </div>
          <LoaderGroup active={true} className={`relative w-[90%] h-auto  aspect-square`}>
            <LoaderRect className='w-full h-full rounded-full'/>
          </LoaderGroup>
        </div>

        <div className="w-full h-full flex flex-col gap-y-4">
          <LoaderGroup active={true} className={`w-[60%] h-[40px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
        </div>

        <div className="w-full h-full flex flex-col gap-y-4">
          <LoaderGroup active={true} className={`w-[60%] h-[40px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
        </div>

        <div className="w-full h-full flex flex-col gap-y-4">
          <LoaderGroup active={true} className={`w-[60%] h-[40px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
        </div>

        <div className="w-full h-full flex flex-col gap-y-4">
          <LoaderGroup active={true} className={`w-[60%] h-[40px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
          <LoaderGroup active={true} className={`w-[60%] h-[20px]`}>
            <LoaderRect className='w-full h-full rounded-sm'/>
          </LoaderGroup>
        </div>
        </>
      )}
    </div>
  )
}

export default Overview;

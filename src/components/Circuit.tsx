import { useWebSocketStore } from "@/store/webSocketStore";
import { transformPoints, rotatePoints, paddPoints } from "@/utils/positionPoints";

interface ICircuitData {
    corners: Array<{
        angle: number;
        length: number;
        number: number;
        trackPosition: {
            x: number;
            y: number;
        };
    }>;
    marshalLights: Array<{
        angle: number;
        length: number;
        number: number;
        trackPosition: {
            x: number;
            y: number;
        };
    }>;
    marshalSectors: Array<{
        angle: number;
        length: number;
        number: number;
        trackPosition: {
            x: number;
            y: number;
        };
    }>;
    candidateLap: {
        driverNumber: string;
        lapNumber: number;
        lapStartDate: string;
        lapStartSessionTime: number;
        lapTime: number;
        session: string;
        sessionStartTime: number;
    };
    circuitKey: number;
    circuitName: string;
    countryIocCode: string;
    countryKey: number;
    countryName: string;
    location: string;
    meetingKey: string;
    meetingName: string;
    meetingOfficialName: string;
    miniSectorsIndexes: number[];
    raceDate: string;
    rotation: number;
    round: number;
    x: number[];
    y: number[];
    year: number;
}

interface IPositionPoint {
    Status: string,
    X: number,
    Y: number,
    Z: number
}

export default function Circuit() {
    const circuitData: ICircuitData = useWebSocketStore(state => state.circuitData)
    const positionData: any = useWebSocketStore(state => state.positionData)

    console.log(positionData?.Position?.[0]?.Entries || {})
    console.log(Object.entries(positionData?.Position?.[0]?.Entries || {}))
    
    if (!circuitData || !positionData) return null
    
    const circuitPoints = circuitData.x.map((x, index) => ({ x, y: circuitData.y[index] }))
    const { transformedPoints, minX, minY, width, height, centerX, centerY } = transformPoints(circuitPoints, circuitData.rotation + 180, 1000)

    let positionPoints = Object.entries(positionData?.Position?.[0]?.Entries || {}).map((item: any) => ({ x: item[1].X, y: item[1].Y }))
    const rotatedPositionPoints = rotatePoints(positionPoints, { x: centerX, y: centerY }, circuitData.rotation + 180)
    const paddingRotatedPositionPoints = paddPoints(rotatedPositionPoints, 1000)

    return (
        <div className="">
            <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* TRACK LINE */}
                <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="white" strokeWidth="200" fill="none" />

                {/* CENTER POINT */}
                <circle cx={`${centerX}`} cy={`${centerY}`} r="250" fill="lime" />

                {paddingRotatedPositionPoints.map((point, index) => (
                    <circle key={index} cx={`${point.x}`} cy={`${point.y}`} r="250" fill="red" className="duration-500 ease-in-out" />
                ))}
            </svg>
            {/* <pre>{JSON.stringify(circuitData, null, 4)}</pre> */}
        </div>
    )
}
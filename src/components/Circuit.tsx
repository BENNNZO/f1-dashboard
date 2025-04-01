import { transformPoints } from "@/utils/positionPoints";

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


export default function Circuit({ circuitData }: { circuitData: ICircuitData }) {
    // const positionData = useStore((state: any) => state.data["Position.z"])

    // if (positionData !== undefined) console.log(positionData)
    // if (positionData !== undefined) console.log(decodeZippedBase64(positionData))
    // const positions = decodeZippedBase64(positionData)

    const PADDING = 1000
    
    const points = circuitData.x.map((x, index) => ({ x, y: circuitData.y[index] }))

    const { transformedPoints, minX, minY, width, height, centerX, centerY } = transformPoints(points, circuitData.rotation + 180, PADDING)

    return (
        <div className="">
            <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* TRACK LINE */}
                <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="white" strokeWidth="200" fill="none" />

                {/* CENTER POINT */}
                <circle cx={`${centerX}`} cy={`${centerY}`} r="250" fill="lime" />
            </svg>
        </div>
    )
}
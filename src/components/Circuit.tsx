import { rotatePoints, paddPoints } from "@/utils/positionPoints";

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
    // padding around the circuit svg graphic
    const PADDING = 500
    
    // ALL of this has a specific order so that the values are positioned correctly
    // ant other order will result in wrongly positioned points
    // formatt points > get center > rotate points > get min max width and height > add padding

    // formatt the points into [{x, y}...]
    let points = circuitData.x.map((x, index) => ({ x, y: circuitData.y[index] }))
    
    // get the center of all points
    const centerX = (Math.max(...points.map(p => p.x)) - Math.min(...points.map(p => p.x))) / 2 + Math.min(...points.map(p => p.x))
    const centerY = (Math.max(...points.map(p => p.y)) - Math.min(...points.map(p => p.y))) / 2 + Math.min(...points.map(p => p.y))
    
    // apply rotation transform
    points = rotatePoints(points, { x: centerX, y: centerY }, circuitData.rotation + 180)
    
    // get min max width and height
    const minX = Math.min(...points.map(point => point.x))
    const minY = Math.min(...points.map(point => point.y))
    
    // max + |min| + (padding * 2) === width or height
    const width = Math.max(...points.map(point => point.x)) + Math.abs(Math.min(...points.map(point => point.x))) + (PADDING * 2)
    const height = Math.max(...points.map(point => point.y)) + Math.abs(Math.min(...points.map(point => point.y))) + (PADDING * 2)
    
    // finally apply padding transform
    points = paddPoints(points, PADDING)

    return (
        <div className="">
            <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* TRACK LINE */}
                <polyline points={points.map(item => `${item.x},${item.y}`).join(" ") + ` ${points[0].x},${points[0].y}`} stroke="white" strokeWidth="200" fill="none" />

                {/* CENTER POINT */}
                <circle cx={`${centerX}`} cy={`${centerY}`} r="250" fill="lime" />
            </svg>
        </div>
    )
}


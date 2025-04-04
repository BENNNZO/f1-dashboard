"use client"

import { useState, useEffect } from "react";

import { useWebSocketStore } from "@/store/webSocketStore";
import { transformPoints, rotatePoint, paddPoint } from "@/utils/positionPoints";

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
    // get data from store
    const circuitData: ICircuitData = useWebSocketStore(state => state.circuitData)
    const positionData: any = useWebSocketStore(state => state.positionData)
    const driverList: any = useWebSocketStore(state => state.driverList)
    
    // states for timing logic
    const [currentPosition, setCurrentPosition] = useState<{ Entries: Record<string, IPositionPoint> } | null>(null)
    const [prevPosition, setPrevPosition] = useState<{ Timestamp: string } | null>(null)
    
    // handles timing logic
    useEffect(() => {
        if (!positionData) return

        const startTime = positionData[0].Timestamp

        positionData.forEach((position: any, index: number) => {
            let delayTime = 0

            if (index === 0) {
                delayTime = new Date(position.Timestamp).getTime() - new Date(prevPosition?.Timestamp ?? 0).getTime()
            } else {
                delayTime = new Date(position.Timestamp).getTime() - new Date(startTime).getTime()
            }

            setTimeout(() => {
                console.log(position.Timestamp)
                setCurrentPosition(position)
            }, delayTime)
        });

        setPrevPosition(positionData.slice(-1)[0])
    }, [positionData])

    // retrun null if data is not ready yet
    if (!circuitData || !positionData || !currentPosition) return null
    
    // formatt and transform circuit path coords
    const circuitPoints = circuitData.x.map((x, index) => ({ x, y: circuitData.y[index] }))
    const { transformedPoints, minX, minY, width, height, centerX, centerY } = transformPoints(circuitPoints, circuitData.rotation + 180, 1000)
    const center = { x: centerX, y: centerY }

    return (
        <div className="">
            <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                {/* TRACK LINE */}
                <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="grey" strokeWidth="300" fill="none" />
                <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="white" strokeWidth="150" fill="none" />

                {/* CENTER POINT */}
                {/* <circle cx={`${centerX}`} cy={`${centerY}`} r="250" fill="lime" /> */}

                {/* CORNER NUMBER NEED OFFSETTING WIP */}
                {/* {circuitData.corners.map(corner => {
                    const { x, y } = paddPoint(rotatePoint(corner.trackPosition, center, circuitData.rotation + 180), 1000)

                    return <text key={corner.number} x={x} y={y} className="text-[500px] fill-white font-mono">{corner.number}</text>
                })} */}

                {/* DRIVER ANIMATED POINTS */}
                {Object.entries(currentPosition.Entries).map((entry, index: number) => {
                    const driverNumber = entry[0]
                    const { X, Y } = entry[1] as IPositionPoint

                    const point = paddPoint(rotatePoint({ x: X, y: Y }, center, circuitData.rotation + 180), 1000)

                    return (
                        <circle key={index} cx={`${point.x}`} cy={`${point.y}`} r="150" fill={`#${driverList[driverNumber].TeamColour}`} className="duration-500 ease-linear" />
                    )
                })}
            </svg>
        </div>
    )
}
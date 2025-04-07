"use client"

import { useState, useEffect } from "react";
import axios from "axios";

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
    const updateCircuitData = useWebSocketStore(state => state.updateCircuitData)
    const sessionInfo = useWebSocketStore(state => state.sessionInfo)
    const circuitData: ICircuitData = useWebSocketStore(state => state.circuitData)
    const positionData: any = useWebSocketStore(state => state.positionData)
    const driverList: any = useWebSocketStore(state => state.driverList)

    // states for timing logic
    const [currentPosition, setCurrentPosition] = useState<{ Entries: Record<string, IPositionPoint> } | null>(null)
    const [prevPosition, setPrevPosition] = useState<{ Timestamp: string } | null>(null)

    // get circuit data
    useEffect(() => {
        if (!sessionInfo) return

        console.log("circuit reload")
        axios.get(`https://api.multiviewer.app/api/v1/circuits/${sessionInfo.Meeting.Circuit.Key}/${new Date().getFullYear()}`)
            .then(res => {
                console.log("GOT CIRCUIT DATA")
                console.log(res.data)
                updateCircuitData(res.data)
            })
            .catch(err => console.log(err))
    }, [sessionInfo])

    // handles timing logic
    useEffect(() => {
        if (!positionData) return

        const startTime = positionData[0].Timestamp

        positionData.forEach((position: any, index: number) => {
            console.log("position data")
            let delayTime = 0

            if (index === 0) {
                delayTime = new Date(position.Timestamp).getTime() - new Date(prevPosition?.Timestamp ?? 0).getTime()
            } else {
                delayTime = new Date(position.Timestamp).getTime() - new Date(startTime).getTime()
            }

            setTimeout(() => setCurrentPosition(position), delayTime)
        });

        setPrevPosition(positionData.slice(-1)[0])
    }, [positionData, circuitData])

    // retrun null if data is not ready yet
    if (circuitData && positionData && currentPosition) {
        // formatt and transform circuit path coords
        const circuitPoints = circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] }))
        const { transformedPoints, minX, minY, width, height, centerX, centerY } = transformPoints(circuitPoints, -circuitData.rotation + 180, 1000)
        const center = { x: centerX, y: centerY }

        if (circuitData && positionData && driverList) return (
            <div className="w-full">
                <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    {/* TRACK LINE */}
                    <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="#ffffff40" strokeWidth="300" fill="none" />
                    <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="#ffffff" strokeWidth="100" fill="none" />

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

                        const point = paddPoint(rotatePoint({ x: -X, y: Y }, center, -circuitData.rotation + 180), 1000)

                        const teamColor = driverList[driverNumber]?.TeamColour ?? "FFFFFF"

                        return (
                            <g key={driverNumber} className="duration-500 ease-linear" style={{ transform: `translate(${point.x}px, ${point.y}px)` }}>
                                <text className={`text-[300px] opacity-50 font-bold absolute`} style={{ transform: `translate(175px, 100px)` }} fill={`#${teamColor}`}>{driverList[driverNumber]?.Tla ?? ""}</text>
                                <circle r="150" fill={`#${teamColor}`} stroke="#00000040" strokeWidth={100} />
                            </g>
                        )
                    })}
                </svg>
            </div>
        )
    } else {
        return (
            <div className="flex flex-row gap-2">
                {/* <pre className="w-40 overflow-x-scroll bg-red-400">CIRCUIT DATA: {JSON.stringify(circuitData, null, 4)}</pre>
                <pre className="w-40 overflow-x-scroll bg-orange-400">POSITION DATA: {JSON.stringify(positionData, null, 4)}</pre>
                <pre className="w-40 overflow-x-scroll bg-yellow-400">CURRENT POSITION: {JSON.stringify(currentPosition, null, 4)}</pre>
                <pre className="w-40 overflow-x-scroll bg-green-400">PREV POSITION: {JSON.stringify(prevPosition, null, 4)}</pre>
                <pre className="w-40 overflow-x-scroll bg-blue-400">DRIVER LIST: {JSON.stringify(driverList, null, 4)}</pre>
                <pre className="w-40 overflow-x-scroll bg-purple-400">SESSION INFO: {JSON.stringify(sessionInfo, null, 4)}</pre> */}
            </div>
        )
    }
}
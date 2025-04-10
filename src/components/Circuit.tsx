"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { useWebSocketStore } from "@/store/webSocketStore";
import { transformPoints, rotatePoint, paddPoint } from "@/utils/positionPoints";

import { ICircuitData } from "@/types/ICircuitData.type";
import { ISessionInfo } from "@/types/ISessionInfo.type";
import { IPositionData, IPositionDataObject, IPositionEntry } from "@/types/IPositionData.type";
import { IDriverList } from "@/types/IDriverList.type";

import Skeleton from "./Skeleton";

interface IPoint {
    x: number,
    y: number
}

export default function Circuit() {
    // get data from store
    const updateCircuitData = useWebSocketStore(state => state.updateCircuitData)
    const sessionInfo: ISessionInfo | null = useWebSocketStore(state => state.sessionInfo)
    const circuitData: ICircuitData | null = useWebSocketStore(state => state.circuitData)
    const positionData: IPositionData | null = useWebSocketStore(state => state.positionData)
    const driverList: IDriverList | null = useWebSocketStore(state => state.driverList)

    // states for timing logic
    const [currentPosition, setCurrentPosition] = useState<{ Entries: Record<string, IPositionEntry> } | null>(null)
    const [prevPosition, setPrevPosition] = useState<{ Timestamp: string } | null>(null)

    // get circuit data
    useEffect(() => {
        if (!sessionInfo) return

        axios.get(`https://api.multiviewer.app/api/v1/circuits/${sessionInfo.Meeting.Circuit.Key}/${new Date().getFullYear()}`)
            .then(res => updateCircuitData(res.data))
            .catch(err => console.log(err))
    }, [sessionInfo, updateCircuitData])

    // handles timing logic
    useEffect(() => {
        if (!positionData) return

        const startTime: string = positionData[0].Timestamp

        positionData.forEach((position: IPositionDataObject, index: number) => {
            let delayTime = 0

            if (index === 0) {
                delayTime = new Date(position.Timestamp).getTime() - new Date(prevPosition?.Timestamp ?? 0).getTime()
            } else {
                delayTime = new Date(position.Timestamp).getTime() - new Date(startTime).getTime()
            }

            setTimeout(() => setCurrentPosition(position), delayTime)
        });

        setPrevPosition(positionData.slice(-1)[0])
    }, [positionData, circuitData, prevPosition?.Timestamp])

    if (circuitData && positionData && currentPosition && driverList) {
        // formatt and transform circuit path coords
        const circuitPoints = circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] }))
        const { transformedPoints, minX, minY, width, height, centerX, centerY } = transformPoints(circuitPoints, -circuitData.rotation + 180, 1000)
        const center = { x: centerX, y: centerY }

        return (
            <div className="w-full relative">
                <Image src={`/flags/${sessionInfo?.Meeting.Country.Code.toLowerCase() ?? "unknown"}.svg`} width={80} height={80} alt="country-flag" className="w-24 rounded-xl object-cover absolute top-2 left-2 shadow-md" />
                <svg width="100%" height="100%" viewBox={`${minX} ${minY} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="#ffffff40" strokeWidth="300" fill="none" />
                    <polyline points={transformedPoints.map(item => `${item.x},${item.y}`).join(" ") + ` ${transformedPoints[0].x},${transformedPoints[0].y}`} stroke="#ffffff" strokeWidth="100" fill="none" />

                    {Object.entries(currentPosition.Entries).map((entry: [string, IPositionEntry]) => {
                        const driverNumber: string = entry[0]
                        const { X, Y }: { X: number, Y: number } = entry[1]

                        const point: IPoint = paddPoint(rotatePoint({ x: -X, y: Y }, center, -circuitData.rotation + 180), 1000)
                        const teamColor: string = driverList[driverNumber]?.TeamColour ?? "FFFFFF"

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
    } else return (
        <div className="w-full p-2">
            <Skeleton delay={null} width={null} height={null} />
        </div>
    )
}
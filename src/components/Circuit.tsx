"use client"

import axios from "axios"
import Image from "next/image"
import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { CircuitData } from "@/types/CircuitData.type"
import type { SessionInfo } from "@/types/SessionInfo.type"
import { transformPoints } from "@/utils/positionPoints"

import Skeleton from "./Skeleton"

export default function Circuit() {
    const updateCircuitData = useWebSocketStore((state) => state.updateCircuitData)
    const sessionInfo: SessionInfo | null = useWebSocketStore((state) => state.sessionInfo)
    const circuitData: CircuitData | null = useWebSocketStore((state) => state.circuitData)

    useEffect(() => {
        if (!sessionInfo) return

        axios
            .get(
                `https://api.multiviewer.app/api/v1/circuits/${sessionInfo.Meeting.Circuit.Key}/${new Date().getFullYear()}`,
            )
            .then((res) => updateCircuitData(res.data))
            .catch((err) => console.error(err))
    }, [sessionInfo, updateCircuitData])

    if (circuitData) {
        const circuitPoints = circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] }))
        const { transformedPoints, minX, minY, width, height } = transformPoints(
            circuitPoints,
            -circuitData.rotation + 180,
            1000,
        )

        return (
            <div className="relative w-full">
                <Image
                    className="absolute top-2 left-2 w-24 rounded-xl object-cover shadow-md"
                    src={`/flags/${sessionInfo?.Meeting.Country.Code.toLowerCase() ?? "unknown"}.svg`}
                    width={80}
                    height={80}
                    alt="country-flag"
                />

                <svg
                    width="100%"
                    height="100%"
                    viewBox={`${minX} ${minY} ${width} ${height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Track map</title>

                    <polyline
                        points={
                            transformedPoints.map((item) => `${item.x},${item.y}`).join(" ") +
                            ` ${transformedPoints[0].x},${transformedPoints[0].y}`
                        }
                        stroke="#ffffff40"
                        strokeWidth="300"
                        fill="none"
                    />

                    <polyline
                        points={
                            transformedPoints.map((item) => `${item.x},${item.y}`).join(" ") +
                            ` ${transformedPoints[0].x},${transformedPoints[0].y}`
                        }
                        stroke="#ffffff"
                        strokeWidth="100"
                        fill="none"
                    />
                </svg>
            </div>
        )
    }

    return (
        <div className="w-full p-2">
            <Skeleton />
        </div>
    )
}

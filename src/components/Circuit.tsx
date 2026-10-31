"use client"

import axios from "axios"
import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import { transformPoints } from "@/utils/positionPoints"

import Flag from "./Flag"
import Skeleton from "./Skeleton"

export default function Circuit() {
    const updateCircuitData = useWebSocketStore((state) => state.updateCircuitData)
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)
    const circuitData = useWebSocketStore((state) => state.circuitData)

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
            <div className="relative w-full overflow-hidden">
                <Flag countryCode={sessionInfo?.Meeting.Country.Code.toLowerCase()} />

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

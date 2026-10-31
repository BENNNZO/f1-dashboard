"use client"

import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import { getViewBox, rotatePoints } from "@/utils/positionPoints"

import Flag from "./Flag"

export default function Circuit() {
    const updateCircuitData = useWebSocketStore((state) => state.updateCircuitData)
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)
    const circuitData = useWebSocketStore((state) => state.circuitData)

    useEffect(() => {
        if (!sessionInfo) return

        const url = `https://api.multiviewer.app/api/v1/circuits/${sessionInfo.Meeting.Circuit.Key}/${new Date().getFullYear()}`
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Circuit request failed: ${res.status}`)
                return res.json()
            })
            .then((data) => updateCircuitData(data))
            .catch((err) => console.error(err))
    }, [sessionInfo, updateCircuitData])

    if (circuitData) {
        const circuitPoints = rotatePoints(
            circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] })),
            -circuitData.rotation + 180,
        )

        return (
            <div className="relative w-full overflow-hidden">
                <Flag countryCode={sessionInfo?.Meeting.Country.Code.toLowerCase()} />

                <svg
                    width="100%"
                    height="100%"
                    viewBox={getViewBox(circuitPoints, 1000)}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Track map</title>

                    <polyline
                        points={
                            circuitPoints.map((item) => `${item.x},${item.y}`).join(" ") +
                            ` ${circuitPoints[0].x},${circuitPoints[0].y}`
                        }
                        stroke="#ffffff40"
                        strokeWidth="300"
                        fill="none"
                    />

                    <polyline
                        points={
                            circuitPoints.map((item) => `${item.x},${item.y}`).join(" ") +
                            ` ${circuitPoints[0].x},${circuitPoints[0].y}`
                        }
                        stroke="#ffffff"
                        strokeWidth="100"
                        fill="none"
                    />
                </svg>
            </div>
        )
    }
}

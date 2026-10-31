"use client"

import { useEffect, useMemo } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import { rotatePoints } from "@/utils/positionPoints"

import Circuit3D from "./Circuit3D"
import Flag from "./Flag"

const ROTATION_OFFSETS: Record<number, number> = {
    65: 28.3,
}

export default function Circuit() {
    const updateCircuitData = useWebSocketStore((state) => state.updateCircuitData)
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)
    const circuitData = useWebSocketStore((state) => state.circuitData)
    const circuitKey = sessionInfo?.Meeting.Circuit.Key

    useEffect(() => {
        if (!circuitKey) return

        const url = `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${new Date().getFullYear()}`
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Circuit request failed: ${res.status}`)
                return res.json()
            })
            .then((data) => updateCircuitData(data))
            .catch((err) => console.error(err))
    }, [circuitKey, updateCircuitData])

    const circuitPoints = useMemo(() => {
        if (!circuitData) return null

        return rotatePoints(
            circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] })),
            -circuitData.rotation + 180 + (ROTATION_OFFSETS[circuitData.circuitKey] ?? 0),
        )
    }, [circuitData])

    if (circuitPoints) {
        return (
            <div className="relative w-full overflow-hidden">
                <Flag countryCode={sessionInfo?.Meeting.Country.Code.toLowerCase()} />
                <Circuit3D circuitPoints={circuitPoints} />

                {/* <svg
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
                </svg> */}
            </div>
        )
    }
}

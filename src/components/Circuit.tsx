"use client"

import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"

import Circuit3D from "./Circuit3D"
import Flag from "./Flag"

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

    if (circuitData) {
        return (
            <div className="relative w-full overflow-hidden">
                <Flag countryCode={sessionInfo?.Meeting.Country.Code.toLowerCase()} />
                <Circuit3D circuitData={circuitData} />
            </div>
        )
    }
}

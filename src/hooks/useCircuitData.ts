import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"

export default function useCircuitData(circuitKey: number | undefined, year: number | undefined) {
    const updateCircuitData = useWebSocketStore((state) => state.updateCircuitData)
    const circuitData = useWebSocketStore((state) => state.circuitData)

    useEffect(() => {
        if (!(circuitKey && year)) return
        if (useWebSocketStore.getState().circuitData?.circuitKey === circuitKey) return

        const url = `https://api.multiviewer.app/api/v1/circuits/${circuitKey}/${year}`
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Circuit request failed: ${res.status}`)
                return res.json()
            })
            .then((data) => updateCircuitData(data))
            .catch((err) => console.error(err))
    }, [circuitKey, year, updateCircuitData])

    return circuitData
}

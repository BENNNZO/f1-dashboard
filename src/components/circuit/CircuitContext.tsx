import { createContext, type ReactNode, useContext, useMemo } from "react"

import useCircuitData from "@/hooks/useCircuitData"
import { useWebSocketStore } from "@/store/webSocketStore"
import buildCircuitPoints from "@/utils/buildCircuitPoints"
import type { Point } from "@/utils/positionPoints"

type CircuitContextData = {
    countryCode: string
    circuitPoints: Point[]
}

export const CircuitContext = createContext<CircuitContextData | null>(null)

export function useCircuit(): CircuitContextData {
    const context = useContext(CircuitContext)
    if (!context) throw new Error("useCircuit() must be used inside CircuitProvider")
    return context
}

export default function CircuitProvider({ children }: { children: ReactNode }) {
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)
    const circuitData = useCircuitData(sessionInfo?.Meeting.Circuit.Key)

    const countryCode = sessionInfo?.Meeting.Country.Code.toLowerCase()
    const circuitPoints = useMemo(() => buildCircuitPoints(circuitData), [circuitData])

    if (!(countryCode && circuitPoints)) return null

    return (
        <CircuitContext
            value={{
                countryCode,
                circuitPoints,
            }}
        >
            {children}
        </CircuitContext>
    )
}

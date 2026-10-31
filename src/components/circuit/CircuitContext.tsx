import { createContext, type ReactNode, useContext, useMemo } from "react"
import type { CatmullRomCurve3 } from "three"

import useCircuitData from "@/hooks/useCircuitData"
import useSegmentFlags from "@/hooks/useSegmentFlags"
import { useWebSocketStore } from "@/store/webSocketStore"
import buildCircuit, { type Segment } from "@/utils/buildCircuit"

type CircuitContextData = {
    countryCode: string
    circuitCurve: CatmullRomCurve3
    circuitSegments: Segment[]
    segmentFlags: Record<number, string>
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

    const segmentNumbers = useMemo(() => circuitData?.marshalSectors.map(({ number }) => number) ?? [], [circuitData])
    const segmentFlags = useSegmentFlags(segmentNumbers)
    const countryCode = sessionInfo?.Meeting.Country.Code.toLowerCase()
    const circuit = useMemo(() => buildCircuit(circuitData), [circuitData])

    if (!(countryCode && circuit)) return null

    return (
        <CircuitContext
            value={{
                countryCode,
                circuitCurve: circuit.curve,
                circuitSegments: circuit.segments,
                segmentFlags,
            }}
        >
            {children}
        </CircuitContext>
    )
}

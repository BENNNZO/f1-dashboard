import { createContext, useContext } from "react"

import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"
import type { TimingStatsLine } from "@/types/TimingStats.type"

type DriverContextData = {
    timingData: TimingDataLine
    timingStats: TimingStatsLine
    driver: DriverData
}

export const DriverContext = createContext<DriverContextData | null>(null)

export function useDriver(): DriverContextData {
    const context = useContext(DriverContext)
    if (!context) throw new Error("useDriver() must be used inside DriverContext")
    return context
}

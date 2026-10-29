import { createContext, type ReactNode, useContext } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { DriverData } from "@/types/DriverListData.type"
import type { TimingAppDataLine } from "@/types/TimingAppData.type"
import type { TimingDataLine } from "@/types/TimingData.type"
import type { TimingStatsLine } from "@/types/TimingStats.type"

type DriverProviderProps = {
    driverNumber: number
    children: ReactNode
}

type DriverContextData = {
    timingData: TimingDataLine
    timingAppData: TimingAppDataLine
    timingStats: TimingStatsLine
    driver: DriverData
}

export const DriverContext = createContext<DriverContextData | null>(null)

export function useDriver(): DriverContextData {
    const context = useContext(DriverContext)
    if (!context) throw new Error("useDriver() must be used inside DriverContext")
    return context
}

export function DriverProvider({ driverNumber, children }: DriverProviderProps) {
    const driver = useWebSocketStore((state) => state.data.DriverList?.[driverNumber])
    const timingData = useWebSocketStore((state) => state.data.TimingData?.Lines[driverNumber])
    const timingAppData = useWebSocketStore((state) => state.data.TimingAppData?.Lines[driverNumber])
    const timingStats = useWebSocketStore((state) => state.data.TimingStats?.Lines[driverNumber])

    if (!(timingData && timingAppData && timingStats && driver)) return null

    return (
        <DriverContext
            value={{
                timingData,
                timingAppData,
                timingStats,
                driver,
            }}
        >
            {children}
        </DriverContext>
    )
}

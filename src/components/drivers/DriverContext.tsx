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
    qualifying?: { part: number; inDropZone: boolean; atCutoff: boolean }
}

function getDriverQualifyPart(position: number, noEntries: number[]) {
    if (position > noEntries[1]) return 1
    if (position > noEntries[2]) return 2
    return 3
}

export const DriverContext = createContext<DriverContextData | null>(null)

export function useDriver(): DriverContextData {
    const context = useContext(DriverContext)
    if (!context) throw new Error("useDriver() must be used inside DriverProvider")
    return context
}

export function DriverProvider({ driverNumber, children }: DriverProviderProps) {
    const driver = useWebSocketStore((state) => state.data.DriverList?.[driverNumber])
    const timingData = useWebSocketStore((state) => state.data.TimingData?.Lines[driverNumber])
    const timingAppData = useWebSocketStore((state) => state.data.TimingAppData?.Lines[driverNumber])
    const timingStats = useWebSocketStore((state) => state.data.TimingStats?.Lines[driverNumber])
    const sessionPart = useWebSocketStore((state) => state.data.TimingData?.SessionPart)
    const noEntries = useWebSocketStore((state) => state.data.TimingData?.NoEntries)

    if (!(timingData && timingAppData && timingStats && driver)) return null

    const position = Number(timingData.Position)
    const qualifying =
        sessionPart && noEntries
            ? {
                  part: Math.min(sessionPart, getDriverQualifyPart(position, noEntries)),
                  inDropZone:
                      !timingData.KnockedOut &&
                      noEntries[sessionPart] !== undefined &&
                      position > noEntries[sessionPart],
                  atCutoff: position === noEntries[sessionPart],
              }
            : undefined

    return (
        <DriverContext
            value={{
                timingData,
                timingAppData,
                timingStats,
                driver,
                qualifying,
            }}
        >
            {children}
        </DriverContext>
    )
}

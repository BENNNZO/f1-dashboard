import { motion } from "framer-motion"

import Skeleton from "@/components/Skeleton"
import { useWebSocketStore } from "@/store/webSocketStore"
import type { IDriverList } from "@/types/IDriverList.type"
import type { ITimingAppData } from "@/types/ITimingAppData.type"
import type { ITimingData, ITimingDataLine } from "@/types/ITimingData.type"

import Driver from "./Driver"

export default function DriverList() {
    const timingAppData: ITimingAppData | null = useWebSocketStore((state) => state.timingAppData)
    const driverList: IDriverList | null = useWebSocketStore((state) => state.driverList)
    const timingData: ITimingData | null = useWebSocketStore((state) => state.timingData)

    if (timingAppData && driverList && timingData) {
        const sortedTimingData: [string, ITimingDataLine][] = Object.entries(timingData.Lines).sort(
            (a, b) => Number(a[1].Position) - Number(b[1].Position),
        )
        // sortedTimingData.unshift(sortedTimingData[0])

        return (
            <motion.div className="relative flex shrink-0 flex-col gap-2 overflow-y-scroll p-2 font-mono">
                {sortedTimingData.map((data) => {
                    const driverNumber: string = data[0]
                    const timingData: ITimingDataLine = data[1]

                    return (
                        <motion.div
                            layout
                            key={driverNumber}
                        >
                            <Driver
                                timingData={timingData}
                                tireCompound={
                                    timingAppData?.Lines?.[driverNumber]?.Stints?.[0]?.Compound?.toLowerCase() ||
                                    "unknown"
                                }
                                driver={driverList[driverNumber]}
                            />
                        </motion.div>
                    )
                })}
            </motion.div>
        )
    }
    return (
        <div className="relative flex w-1/2 shrink-0 flex-col gap-2 overflow-y-scroll p-2">
            {[...Array(20)].map((_, i) => (
                <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder list that never reorders
                    key={i}
                    delay={i * 100}
                    height={50}
                />
            ))}
        </div>
    )
}

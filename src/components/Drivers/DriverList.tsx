import { motion } from "framer-motion"

import Skeleton from "@/components/Skeleton"
import { useWebSocketStore } from "@/store/webSocketStore"
import type { DriverListData } from "@/types/DriverListData.type"
import type { TimingAppData } from "@/types/TimingAppData.type"
import type { TimingData, TimingDataLine } from "@/types/TimingData.type"

import Driver from "./Driver"

export default function DriverList() {
    const timingAppData: TimingAppData | null = useWebSocketStore((state) => state.timingAppData)
    const driverList: DriverListData | null = useWebSocketStore((state) => state.driverList)
    const timingData: TimingData | null = useWebSocketStore((state) => state.timingData)

    if (timingAppData && driverList && timingData) {
        const sortedTimingData: [string, TimingDataLine][] = Object.entries(timingData.Lines).sort(
            (a, b) => Number(a[1].Position) - Number(b[1].Position),
        )

        return (
            <motion.div className="relative flex shrink-0 flex-col gap-2 overflow-y-scroll p-2 font-mono">
                {sortedTimingData.map((data) => {
                    const driverNumber: string = data[0]
                    const timingData: TimingDataLine = data[1]

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

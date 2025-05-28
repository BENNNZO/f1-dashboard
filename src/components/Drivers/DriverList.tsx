import { useWebSocketStore } from "@/store/webSocketStore"
import { motion } from "framer-motion"

import { IDriverList } from "@/types/IDriverList.type"
import { ITimingAppData } from "@/types/ITimingAppData.type"
import { ITimingData, ITimingDataLine } from "@/types/ITimingData.type"

import Driver from "./Driver"
import Skeleton from "../Skeleton"

export default function DriverList() {
    const timingAppData: ITimingAppData | null = useWebSocketStore(state => state.timingAppData)
    const driverList: IDriverList | null = useWebSocketStore(state => state.driverList)
    const timingData: ITimingData | null = useWebSocketStore(state => state.timingData)

    if (timingAppData && driverList && timingData) {
        const sortedTimingData: [string, ITimingDataLine][] = Object.entries(timingData.Lines).sort((a, b) => Number(a[1].Position) - Number(b[1].Position))
        // sortedTimingData.unshift(sortedTimingData[0])

        return (
            <motion.div
                className="relative flex flex-col gap-2 p-2 overflow-y-scroll font-mono shrink-0"
            >
                {sortedTimingData.map(data => {
                    const driverNumber: string = data[0]
                    const timingData: ITimingDataLine = data[1]

                    return (
                        <motion.div
                            layout
                            key={driverNumber}
                        >
                            <Driver timingData={timingData} tireCompound={timingAppData?.Lines?.[driverNumber]?.Stints?.[0]?.Compound?.toLowerCase() || "unknown"} driver={driverList[driverNumber]} />
                        </motion.div>
                    )
                })}
            </motion.div>
        )
    } else return (
        <div className="relative flex flex-col gap-2 p-2 w-1/2 overflow-y-scroll shrink-0">
            {[...Array(20)].map((e, i) => (
                <Skeleton key={i} delay={i * 100} height={50} />
            ))}
        </div>
    )
}
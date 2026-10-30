import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"

import { DriverProvider } from "./DriverContext"
import DriverRow from "./DriverRow"

export default function DriverList() {
    const driverList = useWebSocketStore((state) => state.data.DriverList)
    const timingData = useWebSocketStore((state) => state.data.TimingData)
    const timingStats = useWebSocketStore((state) => state.data.TimingStats)

    if (driverList && timingData && timingStats) {
        const sortedTimingData = Object.entries(timingData.Lines).sort(
            (a, b) => Number(a[1].Position) - Number(b[1].Position),
        )

        return (
            <ul className="scrollbar-none mask-b-from-[calc(100%-1rem)] flex flex-col overflow-y-auto font-mono">
                {sortedTimingData.map(([driverNumber]) => (
                    <motion.li
                        layout
                        key={driverNumber}
                        className="relative -mt-px shrink-0 overflow-hidden border-zinc-800 border-y transition-[background] duration-500 odd:bg-zinc-925 even:bg-zinc-950"
                        transition={{
                            ease: [0.2, 1, 0.2, 1],
                            duration: 0.75,
                        }}
                    >
                        <DriverProvider driverNumber={Number(driverNumber)}>
                            <DriverRow />
                        </DriverProvider>
                    </motion.li>
                ))}
            </ul>
        )
    }
}

import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"

import DriverRow from "./DriverRow"

export default function DriverList() {
    const driverList = useWebSocketStore((state) => state.data.DriverList)
    const timingData = useWebSocketStore((state) => state.data.TimingData)

    if (driverList && timingData) {
        const sortedTimingData = Object.entries(timingData.Lines).sort(
            (a, b) => Number(a[1].Position) - Number(b[1].Position),
        )

        return (
            <ul className="flex flex-col divide-y divide-white/10 overflow-y-auto font-mono">
                {sortedTimingData.map(([driverNumber, timingData]) => (
                    <motion.li
                        layout
                        key={driverNumber}
                        className="relative odd:bg-[#101013] even:bg-zinc-950"
                        transition={{
                            ease: [0.2, 1, 0.2, 1],
                            duration: 0.5,
                        }}
                    >
                        <DriverRow
                            timingData={timingData}
                            driver={driverList[driverNumber]}
                        />
                    </motion.li>
                ))}
            </ul>
        )
    }
}

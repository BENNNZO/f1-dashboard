import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"

import DriverRow from "./DriverRow"

export default function DriverList() {
    const _currentTyres = useWebSocketStore((state) => state.data.CurrentTyres)
    const driverList = useWebSocketStore((state) => state.data.DriverList)
    const timingData = useWebSocketStore((state) => state.data.TimingData)

    if (driverList && timingData) {
        const sortedTimingData = Object.entries(timingData.Lines).sort(
            (a, b) => Number(a[1].Position) - Number(b[1].Position),
        )

        return (
            <motion.ul className="flex flex-col divide-y divide-white/10 overflow-y-auto font-mono">
                {sortedTimingData.map(([driverNumber, timingData]) => (
                    <motion.li
                        layout
                        key={driverNumber}
                        className="odd:bg-zinc-900/50 even:bg-zinc-950"
                    >
                        <DriverRow
                            timingData={timingData}
                            driver={driverList[driverNumber]}
                        />
                    </motion.li>
                ))}
            </motion.ul>
        )
    }
}

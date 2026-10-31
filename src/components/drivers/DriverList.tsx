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
                    <DriverProvider
                        key={driverNumber}
                        driverNumber={Number(driverNumber)}
                    >
                        <DriverRow />
                    </DriverProvider>
                ))}
            </ul>
        )
    }
}

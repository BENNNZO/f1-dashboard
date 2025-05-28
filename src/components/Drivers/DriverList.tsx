import Image from "next/image"

import { useWebSocketStore } from "@/store/webSocketStore"

import { IDriverList } from "@/types/IDriverList.type"
import { ITimingAppData } from "@/types/ITimingAppData.type"
import { ITimingData, ISegment, ISector, ITimingDataLine } from "@/types/ITimingData.type"

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
            <div className="p-2 shrink-0 relative overflow-y-scroll flex flex-col gap-2 font-mono">
                {sortedTimingData.map((data, index) => {
                    const driverNumber: string = data[0]
                    const timingData: ITimingDataLine = data[1]

                    return (
                        <Driver key={driverNumber} timingData={timingData} tireCompound={timingAppData?.Lines?.[driverNumber]?.Stints?.[0]?.Compound?.toLowerCase() || "unknown"} driver={driverList[driverNumber]} />
                    )
                })}
            </div>
        )
    } else return (
        <div className="p-2 shrink-0 relative overflow-y-scroll flex flex-col gap-2 w-1/2">
            {[...Array(20)].map((e, i) => (
                <Skeleton key={i} delay={i * 100} height={50} />
            ))}
        </div>
    )
}
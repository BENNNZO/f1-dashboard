import type { CSSProperties } from "react"

import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"
import type { TimingStatsLine } from "@/types/TimingStats.type"

import GapTime from "./GapTime"
import LapTime from "./LapTime"
import Sectors from "./Sectors"
import Tag from "./Tag"
import TireImage from "./TireImage"

type DriverRowProps = {
    timingData: TimingDataLine
    timingStats: TimingStatsLine
    driver: DriverData
}

export default function DriverRow({ timingData, timingStats, driver }: DriverRowProps) {
    return (
        <div
            data-retired={timingData?.Retired ? true : undefined}
            data-pit={timingData?.InPit ? true : undefined}
            style={{ "--team-color": `#${driver.TeamColour}` } as CSSProperties}
            className="group/driver relative px-1.5 transition-[filter] duration-500 ease-snappy data-pit:brightness-50 data-retired:brightness-50 data-retired:grayscale"
        >
            <div className="-translate-1/2 absolute top-1/2 left-0 h-3 w-20 rounded-[100%] bg-(--team-color) blur-xl" />
            <div className="absolute top-0 left-0 h-full w-1.5 bg-(--team-color)" />

            <div className="relative z-10 flex flex-row items-center gap-4">
                <Tag
                    driver={driver}
                    timingData={timingData}
                />

                <TireImage driverNumber={Number(driver.RacingNumber)} />
                <GapTime timingData={timingData} />

                <LapTime
                    timingData={timingData}
                    timingStats={timingStats}
                />

                <Sectors sectorData={timingData.Sectors} />
            </div>
        </div>
    )
}

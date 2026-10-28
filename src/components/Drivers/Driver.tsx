import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"

import DriverMetadata from "./DriverMetadata"
import Sectors from "./Sectors"

function opacity(timingData: TimingDataLine) {
    if (timingData?.Retired) return "0.1"
    if (timingData?.InPit) return "0.5"
    return "1"
}

type DriverProps = {
    timingData: TimingDataLine
    tireCompound: string
    driver: DriverData
}

export default function Driver({ timingData, tireCompound, driver }: DriverProps) {
    return (
        <div
            className={mergeClasses(
                "flex flex-row items-center pr-2",
                timingData.InPit && !timingData.Retired ? "scale-x-95" : "scale-100",
            )}
            style={{
                filter: `brightness(${opacity(timingData)})`,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            }}
        >
            <DriverMetadata
                timingData={timingData}
                tireCompound={tireCompound}
                driver={driver}
            />

            <Sectors sectorData={timingData.Sectors} />
        </div>
    )
}

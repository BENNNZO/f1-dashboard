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
                "flex flex-col gap-3 rounded-xl border border-white/5 bg-zinc-900 p-2 duration-500 md:flex-col md:justify-normal md:gap-2 xl:flex-row xl:gap-3 min-[600px]:flex-row min-[600px]:justify-between",
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

            <div className="block h-px w-full bg-white/10 md:block xl:hidden min-[600px]:hidden" />
            <Sectors sectorData={timingData.Sectors} />
        </div>
    )
}

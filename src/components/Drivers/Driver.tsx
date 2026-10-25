import type { IDriver } from "@/types/IDriverList.type"
import type { ITimingDataLine } from "@/types/ITimingData.type"

import DriverMetadata from "./DriverMetadata"
import Sectors from "./Sectors"

function opacity(timingData: ITimingDataLine) {
    if (timingData?.Retired) return "0.1"
    if (timingData?.InPit) return "0.5"
    return "1"
}

export default function Driver({
    timingData,
    tireCompound,
    driver,
}: {
    timingData: ITimingDataLine
    tireCompound: string
    driver: IDriver
}) {
    return (
        <div
            className={`flex flex-col gap-3 rounded-xl border border-white/5 bg-zinc-900 p-2 duration-500 md:flex-col md:justify-normal md:gap-2 xl:flex-row xl:gap-3 min-[600px]:flex-row min-[600px]:justify-between ${timingData.InPit && !timingData.Retired ? "scale-x-95" : "scale-100"}`}
            style={{
                // opacity: `${index === 0 ? "0" : timingData.Retired ? "0.1" : timingData.InPit ? "0.5" : "1"}`,
                // transform: `translateY(${(index - 2) * 58 + 8}px)`,
                // position: `${index === 0 ? "static" : "absolute"}`
                opacity: opacity(timingData),
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            }}
        >
            <DriverMetadata
                timingData={timingData}
                tireCompound={tireCompound}
                driver={driver}
            />
            <div className="block h-px w-full bg-white/10 md:block xl:hidden min-[600px]:hidden"></div>
            <Sectors sectorData={timingData.Sectors} />
        </div>
    )
}

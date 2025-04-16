import Image from "next/image"

import { ITimingDataLine } from "@/types/ITimingData.type"
import { IDriver } from "@/types/IDriverList.type"

import DriverMetadata from "./DriverMetadata"
import Sectors from "./Sectors"

export default function Driver({ timingData, tireCompound, driver }: { timingData: ITimingDataLine, tireCompound: string, driver: IDriver }) {
        
    return (
        <div
            className={`flex flex-col min-[600px]:flex-row min-[600px]:justify-between md:justify-normal gap-3 md:flex-col md:gap-2 xl:flex-row xl:gap-3 border border-white/5 bg-zinc-900 rounded-xl p-2 duration-500 ${timingData.InPit && !timingData.Retired ? "scale-x-95" : "scale-100"}`}
            style={{
                // opacity: `${index === 0 ? "0" : timingData.Retired ? "0.1" : timingData.InPit ? "0.5" : "1"}`,
                // transform: `translateY(${(index - 2) * 58 + 8}px)`,
                // position: `${index === 0 ? "static" : "absolute"}`
                opacity: `${timingData?.Retired ? "0.1" : timingData?.InPit ? "0.5" : "1"}`,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            }}
        >
            <DriverMetadata timingData={timingData} tireCompound={tireCompound} driver={driver} />
            <div className="bg-white/10 h-px w-full block min-[600px]:hidden md:block xl:hidden"></div>
            <Sectors sectorData={timingData.Sectors} />
        </div>
    )
}
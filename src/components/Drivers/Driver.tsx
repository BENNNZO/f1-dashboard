import Image from "next/image"

import { ITimingDataLine } from "@/types/ITimingData.type"
import { IDriver } from "@/types/IDriverList.type"
import { ISector, ISegment } from "@/types/ITimingData.type"

import DriverMetadata from "./DriverMetadata"

const STATUS_COLORS = {
    "0": "#ffffff40",   // grey
    "2048": "#fcf41b",  // yellow
    "2049": "#67ea67",  // green
    "2051": "#9567ea",  // purple
    "2064": "red"       // idk what this number is for
}

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
            <div className="flex gap-2">
                {timingData.Sectors && Object.values(timingData.Sectors).map((sector: ISector, index: number) => (
                    <div key={index} className="flex flex-col gap-2 justify-between">
                        <div className="flex gap-0.5">
                            {sector.Segments && Object.values(sector.Segments).map((segment: ISegment, index: number) => (
                                <div key={index} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="w-2.5 min-[600]:w-1.5 min-[650px]:w-2 min-[700px]:w-2.5 md:w-3 2xl:w-4 h-1.5 rounded-full duration-150"></div>
                            ))}
                        </div>
                        <div className="flex gap-1 items-end">
                            <p className={`font-semibold leading-none ${sector.OverallFastest ? "text-purple-400" : sector.PersonalFastest ? "text-green-300" : "text-white"}`}>{sector.PreviousValue === "" ? "---" : sector.PreviousValue}</p>
                            {/* <p className="font-semibold leading-none text-sm text-white/50">{sector.Value === "" ? "---" : sector.Value}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
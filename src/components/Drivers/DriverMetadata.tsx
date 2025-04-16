import Image from "next/image"

import { ITimingDataLine } from "@/types/ITimingData.type"
import { IDriver } from "@/types/IDriverList.type"

export default function DriverMetadata({ timingData, tireCompound, driver }: { timingData: ITimingDataLine, tireCompound: string, driver: IDriver }) {
    return (
        <div className="flex gap-3">
            <div className="flex gap-2 items-center px-2 rounded-md h-8" style={{ background: `#${driver.TeamColour}ff` }}>
                <p className="text-2xl font-bold">{Number(timingData?.Position) < 10 ? "0" + timingData?.Position : timingData?.Position}</p>
                <p className="text-2xl font-bold">{driver.Tla}</p>
            </div>
            <Image className="outline outline-white/20 rounded-full" src={`icons/tires/${tireCompound}.svg`} width={32} height={32} alt="tire-picture" />
            <div className="flex flex-col w-22">
                <p className={`font-semibold leading-none duration-300 ${timingData?.IntervalToPositionAhead?.Catching ? "text-green-300" : "text-white"}`}>{timingData?.IntervalToPositionAhead?.Value === "" ? "---.---" : timingData?.IntervalToPositionAhead?.Value}</p>
                <p className="font-semibold leading-none text-sm text-white/50">{timingData?.GapToLeader === "" ? "---.---" : timingData?.GapToLeader}</p>
            </div>
            <div className="flex flex-col w-26">
                <p className={`font-semibold leading-none duration-500 ${timingData?.LastLapTime?.OverallFastest ? "text-purple-400" : timingData?.LastLapTime?.PersonalFastest ? "text-green-300" : "text-white"}`}>{timingData?.LastLapTime?.Value === "" ? "-:--.---" : timingData?.LastLapTime?.Value}</p>
                <p className={`font-semibold leading-none text-sm text-white/50`}>{timingData?.BestLapTime.Value === "" ? "-:--.---" : timingData?.BestLapTime?.Value}</p>
            </div>
        </div>
    )
}
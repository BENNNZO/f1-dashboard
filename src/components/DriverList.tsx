import Image from "next/image"

import { useWebSocketStore } from "@/store/webSocketStore"

import { IDriverList } from "@/types/IDriverList.type" 
import { ITimingAppData } from "@/types/ITimingAppData.type"
import { ITimingData, ISegment, ISector, ITimingDataLine } from "@/types/ITimingData.type"

const STATUS_COLORS = {
    "0": "#ffffff40",   // grey
    "2048": "#fcf41b",  // yellow
    "2049": "#67ea67",  // green
    "2051": "#9567ea",  // purple
    "2064": "red"       // idk what this number is for
}

export default function DriverList() {
    const timingAppData: ITimingAppData | null = useWebSocketStore(state => state.timingAppData)
    const driverList: IDriverList | null = useWebSocketStore(state => state.driverList)
    const timingData: ITimingData | null = useWebSocketStore(state => state.timingData)

    if (!timingAppData || !driverList || !timingData) return null

    console.log(timingData)

    const sortedTimingData: [string, ITimingDataLine][] = Object.entries(timingData.Lines).sort((a: any, b: any) => a[1].Position - b[1].Position)

    sortedTimingData.unshift(sortedTimingData[0])

    return (
        <div className="p-2 top-2 shrink-0 relative">
            {sortedTimingData.map((data, index) => {
                const driverNumber: string = data[0]
                const stats: ITimingDataLine = data[1]

                return (
                    <div
                        key={`${index === 0 ? "index" : driverNumber}`}
                        className={`flex gap-3 border border-white/5 bg-zinc-900 rounded-xl p-2 duration-500 ${stats.InPit && !stats.Retired ? "scale-x-95" : "scale-100"}`}
                        style={{
                            opacity: `${index === 0 ? "0" : stats.Retired ? "0.1" : stats.InPit ? "0.5" : "1"}`,
                            transform: `translateY(${(index - 2) * 58}px)`,
                            transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                            position: `${index === 0 ? "static" : "absolute"}`
                        }}
                    >
                        <div className="flex gap-2 items-center px-2 rounded-md h-8 border-2 border-black/30" style={{ background: `#${driverList[driverNumber].TeamColour}ff` }}>
                            <p className="text-2xl font-bold">{Number(stats.Position) < 10 ? "0" + stats.Position : stats.Position}</p>
                            <p className="text-2xl font-bold">{driverList[driverNumber].Tla}</p>
                        </div>
                        <Image className="outline-2 outline-white/20 rounded-full" src={`icons/tires/${timingAppData.Lines[driverNumber].Stints[0].Compound.toLowerCase()}.svg`} width={32} height={32} alt="tire-picture" />
                        {/* <div className="flex flex-col w-22">
                            <p className="font-semibold leading-none">LIFE: {timingAppData.Lines[driverNumber].Stints[0].TotalLaps}</p>
                            <p className="font-semibold leading-none text-sm text-white/50">START: {timingAppData.Lines[driverNumber].Stints[0].StartLaps}</p>
                        </div> */}
                        <div className="flex flex-col w-22">
                            <p className={`font-semibold leading-none duration-300 ${stats.IntervalToPositionAhead.Catching ? "text-green-300" : "text-white"}`}>{stats.IntervalToPositionAhead.Value === "" ? "---.---" : stats.IntervalToPositionAhead.Value}</p>
                            <p className="font-semibold leading-none text-sm text-white/50">{stats.GapToLeader === "" ? "---.---" : stats.GapToLeader}</p>
                        </div>
                        <div className="flex flex-col w-26">
                            <p className={`font-semibold leading-none duration-500 ${stats.LastLapTime.OverallFastest ? "text-purple-400" : stats.LastLapTime.PersonalFastest ? "text-green-300" : "text-white"}`}>{stats.LastLapTime.Value === "" ? "-:--.---" : stats.LastLapTime.Value}</p>
                            <p className={`font-semibold leading-none text-sm text-white/50`}>{stats.BestLapTime.Value === "" ? "-:--.---" : stats.BestLapTime.Value}</p>
                        </div>
                        <div className="flex gap-2">
                            {stats.Sectors.map((sector: ISector, index: number) => (
                                <div key={index} className="flex flex-col justify-between">
                                    <div className="flex gap-0.5">
                                        {sector.Segments.map((segment: ISegment, index: number) => (
                                            <div key={index} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="w-4 h-1.5 rounded-full duration-150"></div>
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
            })}
        </div>
    )
}
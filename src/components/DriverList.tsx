import { useWebSocketStore } from "@/store/webSocketStore"
import Image from "next/image"

const STATUS_COLORS = {
    "0": "#ffffff40",   // grey
    "2048": "#fcf41b",  // yellow
    "2049": "#67ea67",  // green
    "2051": "#9567ea",  // purple
    "2064": "red"       // idk what this number is for
}

interface ISector {
    Stopped: boolean,
    Value: string,
    Status: number,
    OverallFastest: boolean,
    PersonalFastest: boolean,
    Segments: Record<string, ISegment>,
    PreviousValue: string
}

interface ISegment {
    Status: number
}

export default function DriverList() {
    const timingAppData = useWebSocketStore(state => state.timingAppData)
    const driverList = useWebSocketStore(state => state.driverList)
    const timingData = useWebSocketStore(state => state.timingData)

    if (!timingAppData || !driverList || !timingData) return null

    const sortedTimingData = Object.entries(timingData.Lines).sort((a: any, b: any) => a[1].Position - b[1].Position)


    return (
        <div className="flex flex-col border-r border-white/10">
            {sortedTimingData.map(data => {
                const driverNumber: string = data[0]
                const stats: any = data[1]

                return (
                    <div key={driverNumber} className={`flex gap-3 border-b border-white/10 p-2 duration-500 ${stats.InPit && !stats.Retired ? "scale-x-95" : "scale-100"}`} style={{ background: `${stats.InPit ? `#${driverList[driverNumber].TeamColour}00` : ``}`, opacity: `${stats.Retired ? "0.1" : stats.InPit ? "0.5" : "1"}` }}>
                        <div className="flex gap-2 items-center px-2 rounded-md h-8" style={{ background: `#${driverList[driverNumber].TeamColour}ff` }}>
                            <p className="text-2xl font-bold">{stats.Position < 10 ? "0" + stats.Position : stats.Position}</p>
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
                            {Object.entries(stats.Sectors as Record<string, ISector>).map(([sectorNumber, sector]) => (
                                <div className="flex flex-col justify-between">
                                    <div key={sectorNumber} className="flex gap-0.5">
                                        {Object.entries(sector.Segments as Record<string, ISegment>).map(([segmentNumber, segment]) => (
                                            <div key={segmentNumber} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="w-4 h-1.5 rounded-full duration-150"></div>
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
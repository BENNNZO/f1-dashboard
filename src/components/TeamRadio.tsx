"use client"

import { use, useState } from "react"
import { useWebSocketStore } from "@/store/webSocketStore"
import AudioPlayer from "./AudioPlayer"

interface ICapture {
    Path: string,
    RacingNumber: string,
    Utc: string
}

export default function TeamRadio() {
    const [playing, setPlaying] = useState(null)

    const teamRadio: Record<string, ICapture[]> = useWebSocketStore(state => state.teamRadio)
    const sessionInfo = useWebSocketStore(state => state.sessionInfo)
    const driverList = useWebSocketStore(state => state.driverList)

    if (teamRadio) return (
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden p-2 border-l border-white/10">
            {teamRadio.Captures.slice().reverse().map((capture: ICapture, index: number) => {
                const driver = driverList[capture.RacingNumber]

                return (
                    <div key={index} className={`flex flex-row items-center gap-3 p-2 pr-6 duration-300 border border-white/5 rounded-xl bg-zinc-900`}>
                        <p className="text-sm leading-none text-white px-1 font-bold py-1 rounded-md" style={{ background: `#${driver.TeamColour}` }}>{driver.Tla}</p>
                        <AudioPlayer playing={playing} setPlaying={setPlaying} src={`https://livetiming.formula1.com/static/${sessionInfo.Path}${capture.Path}`} />
                    </div>
                )
            })}
        </div>
    )
}
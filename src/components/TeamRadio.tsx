"use client"

import { useState } from "react"
import { useWebSocketStore } from "@/store/webSocketStore"
import AudioPlayer from "./AudioPlayer"
import Skeleton from "./Skeleton"

import { ITeamRadio, ICapture } from "@/types/ITeamRadio.type"
import { ISessionInfo } from "@/types/ISessionInfo.type"
import { IDriverList } from "@/types/IDriverList.type"


export default function TeamRadio() {
    const [playing, setPlaying] = useState<string | null>(null)

    const teamRadio: ITeamRadio | null = useWebSocketStore(state => state.teamRadio)
    const sessionInfo: ISessionInfo | null = useWebSocketStore(state => state.sessionInfo)
    const driverList: IDriverList | null = useWebSocketStore(state => state.driverList)

    if (teamRadio && sessionInfo && driverList) {
        return (
            <div className="flex flex-col gap-2 w-full overflow-y-scroll overflow-x-hidden p-2 lg:border-l border-t border-white/10">
                {Object.values(teamRadio.Captures).slice().reverse().map((capture: ICapture, index: number) => {
                    const driver = driverList[capture.RacingNumber]
    
                    return (
                        <div key={index} className={`flex flex-row items-center gap-3 p-2 pr-6 duration-300 border border-white/5 rounded-xl bg-zinc-900`}>
                            <p className="text-sm leading-none text-white px-1 font-bold py-1 rounded-md" style={{ background: `#${driver.TeamColour}` }}>{driver.Tla}</p>
                            <AudioPlayer playing={playing ?? ""} setPlaying={setPlaying} src={`https://livetiming.formula1.com/static/${sessionInfo.Path}${capture.Path}`} />
                        </div>
                    )
                })}
            </div>
        )
    } else return (
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden p-2 lg:border-l border-t border-white/10">
            {[...Array(20)].map((e, i) => (
                <Skeleton key={i} delay={i * 100} height={42} />
            ))}
        </div>
    ) 
}
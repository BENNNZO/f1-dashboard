"use client"

import { useState } from "react"
import { useWebSocketStore } from "@/store/webSocketStore"
import AudioPlayer from "./AudioPlayer"

interface ICapture {
    Path: string,
    RacingNumber: string,
    Utc: string
}

export default function TeamRadio() {
    const teamRadio: Record<string, ICapture[]> = useWebSocketStore(state => state.teamRadio)
    const sessionInfo = useWebSocketStore(state => state.sessionInfo)

    const [playing, setPlaying] = useState(null)

    console.log(teamRadio)

    if (teamRadio) return (
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden p-2 border-t border-white/10">
            {teamRadio.Captures.reverse().map((capture: ICapture, index: number) => (
                <AudioPlayer key={index} title={"test"} playing={playing} setPlaying={setPlaying} src={`https://livetiming.formula1.com/static/${sessionInfo.Path}${capture.Path}`} />
            ))}
        </div>
    )
}
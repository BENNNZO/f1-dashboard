"use client"

import { useState } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { DriverListData } from "@/types/DriverListData.type"
import type { SessionInfo } from "@/types/SessionInfo.type"
import type { Capture, TeamRadioData } from "@/types/TeamRadioData.type"

import AudioPlayer from "./AudioPlayer"
import Skeleton from "./Skeleton"

export default function TeamRadio() {
    const [playing, setPlaying] = useState<string | null>(null)

    const teamRadio: TeamRadioData | null = useWebSocketStore((state) => state.teamRadio)
    const sessionInfo: SessionInfo | null = useWebSocketStore((state) => state.sessionInfo)
    const driverList: DriverListData | null = useWebSocketStore((state) => state.driverList)

    if (teamRadio && sessionInfo && driverList) {
        return (
            <div className="flex w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll border-white/10 border-t p-2 lg:border-l">
                {Object.values(teamRadio.Captures)
                    .slice()
                    .reverse()
                    .map((capture: Capture) => {
                        const driver = driverList[capture.RacingNumber]

                        return (
                            <div
                                key={capture.Path}
                                className={`flex flex-row items-center gap-3 rounded-xl border border-white/5 bg-zinc-900 p-2 pr-6 duration-300`}
                            >
                                <p
                                    className="rounded-md px-1 py-1 font-bold text-sm text-white leading-none"
                                    style={{ background: `#${driver.TeamColour}` }}
                                >
                                    {driver.Tla}
                                </p>
                                <AudioPlayer
                                    playing={playing ?? ""}
                                    setPlaying={setPlaying}
                                    src={`https://livetiming.formula1.com/static/${sessionInfo.Path}${capture.Path}`}
                                />
                            </div>
                        )
                    })}
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-scroll border-white/10 border-t p-2 lg:border-l">
            {[...Array(20)].map((_, i) => (
                <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder list that never reorders
                    key={i}
                    delay={i * 100}
                    height={42}
                />
            ))}
        </div>
    )
}

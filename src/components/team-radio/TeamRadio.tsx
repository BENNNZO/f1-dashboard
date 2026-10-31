"use client"

import { motion } from "motion/react"
import { useState } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { Capture } from "@/types/TeamRadioData.type"

import AudioPlayer from "./AudioPlayer"

export default function TeamRadio() {
    const [playing, setPlaying] = useState<string | null>(null)

    const teamRadio = useWebSocketStore((state) => state.data.TeamRadio)
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)
    const driverList = useWebSocketStore((state) => state.data.DriverList)

    if (teamRadio && sessionInfo && driverList) {
        return (
            <ul className="mask-y-from-[calc(100%-1rem)] scrollbar-none flex flex-col divide-y divide-zinc-800 overflow-y-auto bg-zinc-925">
                {Object.values(teamRadio.Captures)
                    .slice()
                    .reverse()
                    .map((capture: Capture) => {
                        const driver = driverList[capture.RacingNumber]

                        return (
                            <motion.li
                                layout
                                key={capture.Path}
                                className="flex flex-row items-center gap-3 p-3 pr-6"
                                initial={{ scaleY: 0, y: -25 }}
                                animate={{ scaleY: 1, y: 0 }}
                                transition={{ ease: [0.2, 1, 0.2, 1], duration: 1 }}
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
                            </motion.li>
                        )
                    })}
            </ul>
        )
    }
}

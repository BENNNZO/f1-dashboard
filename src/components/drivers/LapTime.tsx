import { useState } from "react"

import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"
import timeColor from "@/utils/timeColor"

import { useDriver } from "./DriverContext"

export default function LapTimes() {
    const { timingData, timingStats, qualifying } = useDriver()
    const lastLap = timingData.LastLapTime.Value
    const bestLap = timingData.BestLapTime.Value
    const isFastestLap = timingStats.PersonalBestLapTime?.Position === 1

    const [outLapNumber, setOutLapNumber] = useState<number>()
    if (timingData.PitOut && outLapNumber !== timingData.NumberOfLaps) setOutLapNumber(timingData.NumberOfLaps)
    const isOutLap = qualifying && !timingData.InPit && outLapNumber === timingData.NumberOfLaps

    return (
        <div
            data-fastest-lap={isFastestLap ? true : undefined}
            className="relative flex flex-col py-1.25"
        >
            <div className="absolute inset-x-0 -top-0.75 in-data-fastest-lap:top-0 hidden h-1 -translate-y-1/2 rounded-full bg-purple-500 transition-[opacity,top] duration-1000 ease-snappy sm:block" />
            <div className="absolute inset-x-0 in-data-fastest-lap:top-full top-[calc(100%+(--spacing(0.75)))] hidden h-1 -translate-y-1/2 rounded-full bg-purple-500 transition-[opacity,top] duration-1000 ease-snappy sm:block" />

            <p className={mergeClasses("font-semibold leading-none duration-500", timeColor(timingData.LastLapTime))}>
                {isOutLap ? "Out Lap" : sanitizeText(lastLap, { length: 7, fallback: "-:--.--", suffix: "\u00A0" })}
            </p>

            <p
                className={mergeClasses(
                    "font-semibold text-sm text-subtle leading-none",
                    isFastestLap && "text-fastest",
                )}
            >
                {sanitizeText(bestLap, { length: 8, fallback: "-:--.---", suffix: "\u00A0" })}
            </p>
        </div>
    )
}

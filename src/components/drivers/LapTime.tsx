import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"
import timeColor from "@/utils/timeColor"

import { useDriver } from "./DriverContext"

export default function LapTimes() {
    const { timingData, timingStats } = useDriver()
    const lastLap = timingData?.LastLapTime.Value
    const bestLap = timingData?.BestLapTime.Value
    const isFastestLap = timingStats?.PersonalBestLapTime?.Position === 1

    return (
        <div className="relative flex flex-col py-1.25">
            {isFastestLap && (
                <>
                    <div className="absolute inset-x-0 top-0 h-1 -translate-y-1/2 rounded-full bg-purple-500" />
                    <div className="absolute inset-x-0 top-full h-1 -translate-y-1/2 rounded-full bg-purple-500" />
                </>
            )}

            <p className={mergeClasses("font-semibold leading-none duration-500", timeColor(timingData?.LastLapTime))}>
                {sanitizeText(lastLap, { length: 7, fallback: "-:--.--", suffix: "\u00A0" })}
            </p>

            <p
                className={mergeClasses(
                    "font-semibold text-sm text-zinc-500 leading-none",
                    isFastestLap && "text-purple-400",
                )}
            >
                {sanitizeText(bestLap, { length: 8, fallback: "-:--.---", suffix: "\u00A0" })}
            </p>
        </div>
    )
}

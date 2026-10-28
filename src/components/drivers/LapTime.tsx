import type { TimingDataLine } from "@/types/TimingData.type"
import type { TimingStatsLine } from "@/types/TimingStats.type"
import { mergeClasses } from "@/utils/mergeClasses"
import timeColor from "@/utils/timeColor"

type LapTimesProps = {
    timingData: TimingDataLine
    timingStats: TimingStatsLine
}

export default function LapTimes({ timingData, timingStats }: LapTimesProps) {
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
                {lastLap === "" ? "-:--.--" : lastLap.slice(0, 7)}
            </p>

            <p className="font-semibold text-sm text-white/50 leading-none">
                {bestLap === "" ? "-:--.---" : bestLap.slice(0, 8)}
            </p>
        </div>
    )
}

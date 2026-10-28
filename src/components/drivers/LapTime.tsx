import type { TimingDataLine } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"
import timeColor from "@/utils/timeColor"

type LapTimesProps = {
    timingData: TimingDataLine
}

export default function LapTimes({ timingData }: LapTimesProps) {
    return (
        <div className="flex flex-col">
            <p className={mergeClasses("font-semibold leading-none duration-500", timeColor(timingData?.LastLapTime))}>
                {timingData?.LastLapTime?.Value === "" ? "-:--.--" : timingData?.LastLapTime?.Value.slice(0, 7)}
            </p>

            <p className="font-semibold text-sm text-white/50 leading-none">
                {timingData?.BestLapTime.Value === "" ? "-:--.---" : timingData?.BestLapTime?.Value}
            </p>
        </div>
    )
}

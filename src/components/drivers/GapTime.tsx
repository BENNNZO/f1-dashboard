import type { TimingDataLine } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"

type GapTimeProps = {
    timingData: TimingDataLine
}

export default function GapTime({ timingData }: GapTimeProps) {
    return (
        <div className="flex flex-col">
            <p
                className={mergeClasses(
                    "font-semibold text-white leading-none duration-300",
                    timingData?.IntervalToPositionAhead?.Catching && "text-green-300",
                )}
            >
                {timingData?.IntervalToPositionAhead?.Value === ""
                    ? "---.--"
                    : timingData?.IntervalToPositionAhead?.Value.slice(0, 6)}
            </p>

            <p className="font-semibold text-sm text-white/50 leading-none">
                {timingData?.GapToLeader === "" ? "---.---" : timingData?.GapToLeader}
            </p>
        </div>
    )
}

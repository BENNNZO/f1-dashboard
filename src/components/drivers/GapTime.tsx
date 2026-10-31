import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"

import { useDriver } from "./DriverContext"

export default function GapTime() {
    const { timingData } = useDriver()

    const isCatching = timingData?.IntervalToPositionAhead?.Catching
    const gapToNext = timingData?.IntervalToPositionAhead?.Value ?? timingData?.TimeDiffToPositionAhead ?? ""
    const gapToLead = timingData?.GapToLeader ?? timingData?.TimeDiffToFastest ?? ""

    return (
        <div className="flex flex-col">
            <p
                className={mergeClasses(
                    "font-semibold text-white leading-none duration-300",
                    isCatching && "text-emerald-400",
                )}
            >
                {sanitizeText(gapToNext, { length: 6, fallback: "---.--", suffix: "\u00A0" })}
            </p>

            <p className="font-semibold text-sm text-zinc-500 leading-none">
                {sanitizeText(gapToLead, { length: 7, fallback: "---.---", suffix: "\u00A0" })}
            </p>
        </div>
    )
}

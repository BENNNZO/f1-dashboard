import { mergeClasses } from "@/utils/mergeClasses"

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
                {gapToNext === "" ? "---.--" : gapToNext.slice(0, 6)}
            </p>

            <p className="font-semibold text-sm text-zinc-500 leading-none">
                {gapToLead === "" ? "---.---" : gapToLead.slice(0, 7)}
            </p>
        </div>
    )
}

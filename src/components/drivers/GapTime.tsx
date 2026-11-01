import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"

import { useDriver } from "./DriverContext"

export default function GapTime() {
    const { timingData, qualifying } = useDriver()

    const isCatching = timingData.IntervalToPositionAhead?.Catching

    const stats = qualifying && timingData.Stats?.[qualifying.part - 1]

    const gapToNext = qualifying
        ? stats?.TimeDifftoPositionAhead
        : (timingData.IntervalToPositionAhead?.Value ?? timingData.TimeDiffToPositionAhead ?? "")

    const gapToLead = qualifying
        ? stats?.TimeDiffToFastest
        : (timingData.GapToLeader ?? timingData.TimeDiffToFastest ?? "")

    return (
        <div className="flex flex-col">
            <p className={mergeClasses("font-semibold leading-none duration-300", isCatching && "text-emerald-400")}>
                {sanitizeText(gapToNext, { length: 6, fallback: qualifying ? "--.---" : "---.--", suffix: "\u00A0" })}
            </p>

            <p className="font-semibold text-sm text-subtle leading-none">
                {sanitizeText(gapToLead, { length: 7, fallback: "---.---", suffix: "\u00A0" })}
            </p>
        </div>
    )
}

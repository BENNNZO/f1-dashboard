import { useWebSocketStore } from "@/store/webSocketStore"
import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"

import { useDriver } from "./DriverContext"

function getDriverQualifyPart(position: number, NoEntries: number[]) {
    if (position > NoEntries[1]) return 1
    if (position > NoEntries[2]) return 2
    return 3
}

export default function GapTime() {
    const { SessionPart, NoEntries } = useWebSocketStore((state) => state.data.TimingData) ?? {}
    const { timingData } = useDriver()

    let driverQualifyPart = SessionPart ?? 1
    if (timingData.KnockedOut && NoEntries) {
        const position = Number(timingData.Position)
        driverQualifyPart = getDriverQualifyPart(position, NoEntries)
    }

    const isQualifying = SessionPart !== undefined
    const isCatching = timingData.IntervalToPositionAhead?.Catching

    const stats = timingData.Stats?.[driverQualifyPart - 1]

    const gapToNext = isQualifying
        ? stats?.TimeDifftoPositionAhead
        : (timingData.IntervalToPositionAhead?.Value ?? timingData.TimeDiffToPositionAhead ?? "")

    const gapToLead = isQualifying
        ? stats?.TimeDiffToFastest
        : (timingData.GapToLeader ?? timingData.TimeDiffToFastest ?? "")

    return (
        <div className="flex flex-col">
            <p
                className={mergeClasses(
                    "font-semibold text-foreground leading-none duration-300",
                    isCatching && "text-emerald-400",
                )}
            >
                {sanitizeText(gapToNext, { length: 6, fallback: isQualifying ? "--.---" : "---.--", suffix: "\u00A0" })}
            </p>

            <p className="font-semibold text-sm text-subtle leading-none">
                {sanitizeText(gapToLead, { length: 7, fallback: "---.---", suffix: "\u00A0" })}
            </p>
        </div>
    )
}

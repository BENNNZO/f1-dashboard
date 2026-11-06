import { mergeClasses } from "@/utils/mergeClasses"

import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

const TIRE_COLOR: Record<string, string> = {
    hard: "text-tire-hard",
    intermediate: "text-tire-intermediate",
    medium: "text-tire-medium",
    soft: "text-tire-soft",
    unknown: "text-tire-unknown",
    wet: "text-tire-wet",
}

export default function TireData() {
    const { timingAppData, currentTyre } = useDriver()
    const currentStint = timingAppData.Stints?.at(-1)
    const totalLaps = currentStint?.TotalLaps

    return (
        <p className={mergeClasses("flex flex-row items-center gap-1", TIRE_COLOR[currentTyre ?? "unknown"])}>
            <DisplayValue
                className="text-2xl"
                value={currentTyre === "unknown" ? undefined : currentTyre?.slice(0, 1).toUpperCase()}
                length={1}
            />

            <span className="h-5 w-px bg-border" />

            <DisplayValue
                className="text-zinc-600"
                value={totalLaps}
                length={2}
            />
        </p>
    )
}

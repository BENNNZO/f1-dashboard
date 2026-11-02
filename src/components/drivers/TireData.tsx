import { mergeClasses } from "@/utils/mergeClasses"

import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

const TIRE_COLOR: Record<string, string> = {
    hard: "text-zinc-300",
    intermediate: "text-green-400",
    medium: "text-amber-400",
    soft: "text-red-500",
    unknown: "text-zinc-600",
    wet: "text-blue-400",
}

export default function TireData() {
    const { timingAppData, currentTyre } = useDriver()
    const currentStint = timingAppData.Stints.at(-1)
    const totalLaps = currentStint?.TotalLaps

    return (
        <p
            className={mergeClasses(
                "flex flex-row items-center gap-1 font-semibold text-lg",
                TIRE_COLOR[currentTyre ?? "unknown"],
            )}
        >
            <DisplayValue
                className="text-2xl"
                value={currentTyre?.slice(0, 1).toUpperCase()}
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

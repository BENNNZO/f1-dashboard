import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"
import timeColor, { sectorColor } from "@/utils/timeColor"

import { useDriver } from "./DriverContext"

const STATUS_COLORS = {
    "0": "bg-zinc-700",
    "2048": "bg-yellow-300",
    "2049": "bg-emerald-400",
    "2051": "bg-purple-400",
    "2064": "bg-blue-400",
}

export default function Sectors() {
    const { timingData } = useDriver()
    const sectors = timingData.Sectors

    return (
        <div className="flex flex-row gap-2">
            {Object.values(sectors).map((sector, index) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: sectors are a fixed list that never reorders
                    key={index}
                    className="relative flex flex-col gap-1.5"
                >
                    <div
                        className={mergeClasses(
                            "h-1.25 w-[13ch] rounded-full opacity-100 transition-[background] duration-500 group-hover/driver:opacity-0",
                            sectorColor(sector),
                        )}
                    />

                    <div className="absolute flex w-full gap-0.5 opacity-0 group-hover/driver:opacity-100">
                        {Object.values(sector.Segments).map((segment, index) => (
                            <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: segments are a fixed list that never reorders
                                key={index}
                                className={mergeClasses(
                                    "h-1.25 w-full rounded-full duration-150",
                                    STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS],
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex items-end gap-1">
                        <p className={mergeClasses("font-semibold leading-none", timeColor(sector))}>
                            {sanitizeText(sector.Value, { length: 6, fallback: "--.---", suffix: "\u00A0" })}
                        </p>

                        <p className="font-semibold text-sm text-zinc-500 leading-none">
                            {sanitizeText(sector.PreviousValue, { length: 6, fallback: "--.---", suffix: "\u00A0" })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

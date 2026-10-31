import { mergeClasses } from "@/utils/mergeClasses"
import sanitizeText from "@/utils/sanitizeText"
import timeColor, { sectorColor } from "@/utils/timeColor"

import { useDriver } from "./DriverContext"

const STATUS_COLORS = {
    "0": "bg-empty",
    "2048": "bg-sector",
    "2049": "bg-personal-best",
    "2051": "bg-fastest",
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
                            "h-1.25 w-[13ch] rounded-full opacity-100 transition-[background] duration-500 group-hover:opacity-0",
                            sectorColor(sector),
                        )}
                    />

                    <div className="absolute flex w-full gap-0.5 opacity-0 group-hover:opacity-100">
                        {Object.values(sector.Segments ?? {}).map((segment, index) => (
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

                        <p className="font-semibold text-sm text-subtle leading-none">
                            {sanitizeText(sector.PreviousValue, { length: 6, fallback: "--.---", suffix: "\u00A0" })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

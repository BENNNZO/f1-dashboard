import type { Sector, Segment } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"
import timeColor, { sectorColor } from "@/utils/timeColor"

import { useDriver } from "./DriverContext"

const STATUS_COLORS = {
    "0": "bg-zinc-700",
    "2048": "bg-yellow-300",
    "2049": "bg-green-400",
    "2051": "bg-purple-400",
    "2064": "bg-blue-400",
}

export default function Sectors() {
    const { timingData } = useDriver()
    const sectorData = timingData.Sectors

    return (
        <div className="flex flex-row gap-2">
            {sectorData &&
                Object.values(sectorData).map((sector: Sector, index: number) => {
                    if (sector.Segments) {
                        return (
                            <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: sectors are a fixed list that never reorders
                                key={index}
                                className="relative flex flex-col gap-1.5"
                            >
                                <div
                                    className={mergeClasses(
                                        "h-1.25 w-[13ch] rounded-full opacity-100 group-hover/driver:opacity-0",
                                        sectorColor(sector),
                                    )}
                                />

                                <div className="absolute flex w-full gap-0.5 opacity-0 group-hover/driver:opacity-100">
                                    {sector.Segments &&
                                        Object.values(sector.Segments).map((segment: Segment, index: number) => {
                                            const backgroundColor =
                                                STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]

                                            return (
                                                <div
                                                    // biome-ignore lint/suspicious/noArrayIndexKey: segments are a fixed list that never reorders
                                                    key={index}
                                                    className={mergeClasses(
                                                        "h-1.25 w-full rounded-full duration-150",
                                                        backgroundColor,
                                                    )}
                                                />
                                            )
                                        })}
                                </div>

                                <div className="flex items-end gap-1">
                                    <p className={mergeClasses("font-semibold leading-none", timeColor(sector))}>
                                        {sector.Value === "" ? "--.---" : sector.Value.slice(0, 6)}
                                    </p>

                                    <p className="font-semibold text-sm text-white/50 leading-none">
                                        {sector.PreviousValue === "" ? "--.--" : sector.PreviousValue.slice(0, 5)}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                    return null
                })}
        </div>
    )
}

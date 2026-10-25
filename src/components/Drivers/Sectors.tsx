import type { Sector, Segment } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"
import timeColor from "@/utils/timeColor"

const STATUS_COLORS = {
    "0": "#ffffff40", // grey
    "2048": "#fcf41b", // yellow
    "2049": "#67ea67", // green
    "2051": "#9567ea", // purple
    "2064": "deepskyblue", // idk what this number is for
}

type SectorsProps = {
    sectorData: Sector[]
}

export default function Sectors({ sectorData }: SectorsProps) {
    return (
        <div className="flex min-w-32 gap-2">
            {sectorData &&
                Object.values(sectorData).map((sector: Sector, index: number) => {
                    if (sector.Segments) {
                        return (
                            <div
                                // biome-ignore lint/suspicious/noArrayIndexKey: sectors are a fixed list that never reorders
                                key={index}
                                className="flex flex-col justify-between gap-2"
                            >
                                <div className="flex gap-0.5">
                                    {sector.Segments &&
                                        Object.values(sector.Segments).map((segment: Segment, index: number) => (
                                            <div
                                                // biome-ignore lint/suspicious/noArrayIndexKey: segments are a fixed list that never reorders
                                                key={index}
                                                className="h-1.5 w-2.5 rounded-full duration-150 md:w-3 2xl:w-4 min-[600]:w-1.5 min-[650px]:w-2 min-[700px]:w-2.5"
                                                style={{
                                                    background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}`,
                                                }}
                                            />
                                        ))}
                                </div>

                                <div className="flex items-end gap-1">
                                    <p className={mergeClasses("font-semibold leading-none", timeColor(sector))}>
                                        {sector.PreviousValue ? "---" : sector.PreviousValue}
                                    </p>

                                    <p className="font-semibold text-sm text-white/50 leading-none">
                                        {sector.Value === "" ? "---" : sector.Value}
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

import { ISector, ISegment } from "@/types/ITimingData.type"

const STATUS_COLORS = {
    "0": "#ffffff40",           // grey
    "2048": "#fcf41b",          // yellow
    "2049": "#67ea67",          // green
    "2051": "#9567ea",          // purple
    "2064": "deepskyblue"       // idk what this number is for
}

export default function Sectors({ sectorData }: { sectorData: ISector[] }) {
    console.log(sectorData)

    return (
        <div className="flex gap-2 min-w-32">
            {sectorData &&
                Object.values(sectorData).map((sector: ISector, index: number) => {
                    console.log(sector)
                    if (sector.Segments) {
                        return (
                            <div key={index} className="flex flex-col justify-between gap-2">
                                <div className="flex gap-0.5">
                                    {sector.Segments && Object.values(sector.Segments).map((segment: ISegment, index: number) => (
                                        <div key={index} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="rounded-full w-2.5 min-[600]:w-1.5 min-[650px]:w-2 min-[700px]:w-2.5 md:w-3 2xl:w-4 h-1.5 duration-150"></div>
                                    ))}
                                </div>
                                <div className="flex items-end gap-1">
                                    <p className={`font-semibold leading-none ${sector.OverallFastest ? "text-purple-400" : sector.PersonalFastest ? "text-green-300" : "text-white"}`}>{sector.PreviousValue ? "---" : sector.PreviousValue}</p>
                                    <p className="font-semibold text-white/50 text-sm leading-none">{sector.Value === "" ? "---" : sector.Value}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return <></>
                    }
                })
            }
        </div>
    )
}
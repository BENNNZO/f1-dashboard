import { ISector, ISegment } from "@/types/ITimingData.type"

const STATUS_COLORS = {
    "0": "#ffffff40",   // grey
    "2048": "#fcf41b",  // yellow
    "2049": "#67ea67",  // green
    "2051": "#9567ea",  // purple
    "2064": "red"       // idk what this number is for
}

export default function Sectors({ sectorData }: { sectorData: ISector[] }) {
    return (
        <div className="flex gap-2">
            {sectorData && Object.values(sectorData).map((sector: ISector, index: number) => (
                <div key={index} className="flex flex-col gap-2 justify-between">
                    <div className="flex gap-0.5">
                        {sector.Segments && Object.values(sector.Segments).map((segment: ISegment, index: number) => (
                            <div key={index} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="w-2.5 min-[600]:w-1.5 min-[650px]:w-2 min-[700px]:w-2.5 md:w-3 2xl:w-4 h-1.5 rounded-full duration-150"></div>
                        ))}
                    </div>
                    <div className="flex gap-1 items-end">
                        <p className={`font-semibold leading-none ${sector.OverallFastest ? "text-purple-400" : sector.PersonalFastest ? "text-green-300" : "text-white"}`}>{sector.PreviousValue === "" ? "---" : sector.PreviousValue}</p>
                        {/* <p className="font-semibold leading-none text-sm text-white/50">{sector.Value === "" ? "---" : sector.Value}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
}
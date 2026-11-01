import type { Sector } from "@/types/TimingData.type"

export default function timeColor(time: { OverallFastest?: boolean; PersonalFastest?: boolean } | undefined) {
    if (time?.OverallFastest) return "text-fastest"
    if (time?.PersonalFastest) return "text-personal-best"
}

export function sectorColor(sector: Sector) {
    if (sector.Value === "") return "bg-empty"
    if (sector.OverallFastest) return "bg-fastest"
    if (sector.PersonalFastest) return "bg-personal-best"
    return "bg-sector"
}

import type { Sector } from "@/types/TimingData.type"

export default function timeColor(time: { OverallFastest?: boolean; PersonalFastest?: boolean } | undefined) {
    if (time?.OverallFastest) return "text-purple-400"
    if (time?.PersonalFastest) return "text-green-400"
    return "text-white"
}

export function sectorColor(sector: Sector) {
    if (sector.Value === "") return "bg-zinc-700"
    if (sector.OverallFastest) return "bg-purple-400"
    if (sector.PersonalFastest) return "bg-green-400"
    return "bg-yellow-300"
}

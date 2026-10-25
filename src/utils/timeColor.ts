export default function timeColor(time: { OverallFastest?: boolean; PersonalFastest?: boolean } | undefined) {
    if (time?.OverallFastest) return "text-purple-400"
    if (time?.PersonalFastest) return "text-green-300"
    return "text-white"
}

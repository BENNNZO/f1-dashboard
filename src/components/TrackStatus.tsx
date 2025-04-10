import { useWebSocketStore } from "@/store/webSocketStore"
import { ITrackStatus } from "@/types/ITrackStatus.type"

import Skeleton from "./Skeleton"

const statusColors: Record<string, string> = {
    "1": "rgb(13, 186, 131)"
}

export default function TrackStatus() {
    const trackStatus: ITrackStatus | null = useWebSocketStore(state => state.trackStatus)

    if (trackStatus) {
        return (
            <p className="px-4 py-1 h-8 rounded-full bg-zinc-900 border border-white/5" style={{ background: `${statusColors[trackStatus.Status]}` }}>{trackStatus.Message}</p>
        )
    } else {
        return (
            <Skeleton delay={null} width={110} height={32} rounded />
        )
    }
}
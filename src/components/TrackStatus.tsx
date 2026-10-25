import { useWebSocketStore } from "@/store/webSocketStore"
import type { ITrackStatus } from "@/types/ITrackStatus.type"

import Skeleton from "./Skeleton"

const statusColors: Record<string, string> = {
    "1": "rgb(13, 186, 131)",
}

export default function TrackStatus() {
    const trackStatus: ITrackStatus | null = useWebSocketStore((state) => state.trackStatus)

    if (trackStatus) {
        return (
            <p
                className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1"
                style={{ background: `${statusColors[trackStatus.Status]}` }}
            >
                {trackStatus.Message}
            </p>
        )
    }
    return (
        <Skeleton
            width={110}
            height={32}
            rounded
        />
    )
}

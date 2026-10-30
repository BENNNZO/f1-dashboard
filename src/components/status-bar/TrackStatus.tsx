import { useWebSocketStore } from "@/store/webSocketStore"
import { mergeClasses } from "@/utils/mergeClasses"

const statusColors: Record<string, string> = {
    "1": "bg-emerald-500",
}

export default function TrackStatus() {
    const trackStatus = useWebSocketStore((state) => state.data.TrackStatus)

    if (trackStatus) {
        return (
            <p className={mergeClasses("-my-1 px-3 py-1", statusColors[trackStatus.Status])}>{trackStatus.Message}</p>
        )
    }
}

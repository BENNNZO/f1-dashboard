import { useWebSocketStore } from "@/store/webSocketStore"

const statusColors: Record<string, string> = {
    "1": "rgb(13, 186, 131)",
}

export default function TrackStatus() {
    const trackStatus = useWebSocketStore((state) => state.data.TrackStatus)

    if (trackStatus) {
        return (
            <p
                className="-my-1 px-3 py-1"
                style={{ background: `${statusColors[trackStatus.Status]}` }}
            >
                {trackStatus.Message}
            </p>
        )
    }
}

import { useWebSocketStore } from "@/store/webSocketStore"

export default function LapCount() {
    const lapCount = useWebSocketStore((state) => state.data.LapCount)

    if (lapCount) {
        return (
            <p className="px-6">
                {lapCount.CurrentLap} / {lapCount.TotalLaps}
            </p>
        )
    }
}

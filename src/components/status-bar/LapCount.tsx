import { useWebSocketStore } from "@/store/webSocketStore"

export default function LapCount() {
    const lapCount = useWebSocketStore((state) => state.data.LapCount)

    if (!lapCount) return <p className="text-subtle">00 / 00</p>

    return (
        <p>
            {lapCount.CurrentLap} / {lapCount.TotalLaps}
        </p>
    )
}

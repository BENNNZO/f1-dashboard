import { useWebSocketStore } from "@/store/webSocketStore"

interface ILapCount {
    CurrentLap: number,
    TotalLaps: number,
}

export default function LapCount() {
    const lapCount: ILapCount = useWebSocketStore(state => state.lapCount)

    if (lapCount) return (
        <p className="px-4 py-1 h-8 rounded-full bg-zinc-900">{lapCount.CurrentLap} / {lapCount.TotalLaps}</p>
    )
}
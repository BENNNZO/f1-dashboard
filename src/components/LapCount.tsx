import { useWebSocketStore } from "@/store/webSocketStore"

interface ILapCount {
    CurrentLap: number,
    TotalLaps: number,
}

export default function LapCount() {
    const lapCount: ILapCount = useWebSocketStore(state => state.lapCount)

    if (lapCount) return (
        <div>
            <p>{lapCount.CurrentLap} / {lapCount.TotalLaps}</p>
        </div>
    )
}
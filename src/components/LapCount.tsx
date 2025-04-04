import { useWebSocketStore } from "@/store/webSocketStore"

interface ILapCount {
    CurrentLap: number,
    TotalLaps: number,
}

export default function LapCount() {
    const lapCount: ILapCount = useWebSocketStore(state => state.lapCount)

    return (
        <div>
            <p>{lapCount.CurrentLap}</p>
            <p>{lapCount.TotalLaps}</p>
        </div>
    )
}
import { useWebSocketStore } from "@/store/webSocketStore"

interface ILapCount {
    CurrentLap: number,
    TotalLaps: number,
}

export default function LapCount() {
    const lapCount: ILapCount = useWebSocketStore(state => state.lapCount)

    console.log(`\n\n\n\n`)
    console.log(lapCount)

    return (
        <div>
            <p>{lapCount.CurrentLap}</p>
            <p>{lapCount.TotalLaps}</p>
        </div>
    )
}
import { useWebSocketStore } from "@/store/webSocketStore"
import { ILapCount } from "@/types/ILapCount.type"

import Skeleton from "./Skeleton"

export default function LapCount() {
    const lapCount: ILapCount | null = useWebSocketStore(state => state.lapCount)

    if (lapCount) {
        return (
            <p className="px-4 py-1 h-8 rounded-full bg-zinc-900 border border-white/5">{lapCount.CurrentLap} / {lapCount.TotalLaps}</p>
        )
    } else {
        return (
            <Skeleton width={101} height={32} rounded />
        )
    } 
}
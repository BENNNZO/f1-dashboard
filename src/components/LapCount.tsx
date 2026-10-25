import { useWebSocketStore } from "@/store/webSocketStore"
import type { LapCountData } from "@/types/LapCountData.type"

import Skeleton from "./Skeleton"

export default function LapCount() {
    const lapCount: LapCountData | null = useWebSocketStore((state) => state.lapCount)

    if (lapCount) {
        return (
            <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">
                {lapCount.CurrentLap} / {lapCount.TotalLaps}
            </p>
        )
    }
    return (
        <Skeleton
            width={101}
            height={32}
            rounded
        />
    )
}

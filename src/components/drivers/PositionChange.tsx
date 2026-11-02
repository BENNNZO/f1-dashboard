import { useWebSocketStore } from "@/store/webSocketStore"

import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

function getStatus(positionDelta: number) {
    if (positionDelta > 0) return "gained"
    if (positionDelta < 0) return "lost"
}

export default function PositionChange() {
    const { timingData, timingAppData } = useDriver()
    const isRace = useWebSocketStore((state) => state.data.SessionInfo?.Type === "Race")
    const positionDelta = Number(timingAppData.GridPos) - Number(timingData.Position) || undefined
    const status = getStatus(positionDelta ?? 0)

    if (!isRace) return null

    return (
        <DisplayValue
            data-gained={status === "gained" ? true : undefined}
            data-lost={status === "lost" ? true : undefined}
            className="text-subtle text-xl leading-none data-gained:text-emerald-500 data-lost:text-tire-soft"
            value={positionDelta && positionDelta < -9 ? Math.abs(positionDelta) : positionDelta}
            length={2}
            align="right"
        />
    )
}

import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

function getStatus(positionDelta: number) {
    if (positionDelta > 0) return "gained"
    if (positionDelta < 0) return "lost"
}

export default function PositionChange() {
    const { timingData, timingAppData } = useDriver()
    const positionDelta = Number(timingAppData.GridPos) - Number(timingData.Position) || undefined
    const status = getStatus(positionDelta ?? 0)

    return (
        <DisplayValue
            data-gained={status === "gained" ? true : undefined}
            data-lost={status === "lost" ? true : undefined}
            className="flex flex-row items-center font-semibold text-xl text-zinc-500 leading-none data-gained:text-emerald-500 data-lost:text-red-500"
            value={positionDelta && positionDelta < -9 ? Math.abs(positionDelta) : positionDelta}
            length={2}
        />
    )
}

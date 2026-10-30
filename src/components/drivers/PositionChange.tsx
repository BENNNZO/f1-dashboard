import { useDriver } from "./DriverContext"

export default function PositionChange() {
    const { timingData, timingAppData } = useDriver()
    const positionDelta = Number(timingAppData.GridPos) - Number(timingData.Position)

    return (
        <p
            data-gained={positionDelta > 0 ? true : undefined}
            data-lost={positionDelta < 0 ? true : undefined}
            className="font-semibold text-xl text-zinc-500 leading-none data-gained:text-green-400 data-lost:text-red-400"
        >
            {positionDelta >= 0 && positionDelta < 10 ? `\u00A0${positionDelta}` : String(positionDelta)}
        </p>
    )
}

import { useDriver } from "./DriverContext"

export default function Tag() {
    const { timingData, driver } = useDriver()

    return (
        <div className="flex flex-row items-center gap-2 py-1 font-bold text-2xl">
            <p className="text-muted">{timingData.Position.padStart(2, "0")}</p>
            <p>{driver.Tla}</p>
        </div>
    )
}

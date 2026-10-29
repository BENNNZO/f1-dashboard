import { useDriver } from "./DriverContext"

export default function Tag() {
    const { timingData, driver } = useDriver()

    return (
        <div className="flex flex-row gap-2 py-1 pl-3 font-bold text-2xl">
            <p className="text-zinc-400">
                {Number(timingData?.Position) < 10 ? `0${timingData?.Position}` : timingData?.Position}
            </p>

            <p>{driver.Tla}</p>
        </div>
    )
}

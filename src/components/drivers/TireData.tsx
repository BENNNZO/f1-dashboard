import { useDriver } from "./DriverContext"

export default function TireData() {
    const { timingAppData } = useDriver()
    const currentStint = timingAppData.Stints.at(-1)

    return (
        <p className="font-semibold text-xl text-zinc-500 leading-none">
            {(currentStint?.TotalLaps ?? 0) < 10 ? `\u00A0${currentStint?.TotalLaps ?? "-"}` : currentStint?.TotalLaps}
        </p>
    )
}

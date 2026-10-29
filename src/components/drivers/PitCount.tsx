import { useDriver } from "./DriverContext"

export default function PitCount() {
    const { timingData } = useDriver()
    const pitCount = timingData.NumberOfPitStops

    return <p className="font-semibold text-xl text-zinc-400 leading-none">{pitCount ?? "0"}</p>
}

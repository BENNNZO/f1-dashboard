import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

export default function PitCount() {
    const { timingData } = useDriver()
    const pitCount = timingData.NumberOfPitStops

    return (
        <DisplayValue
            className="text-zinc-400"
            value={pitCount}
            length={1}
        />
    )
}

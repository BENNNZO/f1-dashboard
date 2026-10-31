import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

export default function PitCount() {
    const { timingData } = useDriver()
    const pitCount = timingData.NumberOfPitStops

    return (
        <DisplayValue
            value={pitCount}
            length={1}
        />
    )
}

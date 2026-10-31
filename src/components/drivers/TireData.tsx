import DisplayValue from "./DisplayValue"
import { useDriver } from "./DriverContext"

export default function TireData() {
    const { timingAppData } = useDriver()
    const currentStint = timingAppData.Stints.at(-1)
    const totalLaps = currentStint?.TotalLaps

    return (
        <DisplayValue
            value={totalLaps}
            length={2}
        />
    )
}

import { MinusIcon } from "lucide-react"

import { useDriver } from "./DriverContext"

export default function PitCount() {
    const { timingData } = useDriver()
    const pitCount = timingData.NumberOfPitStops

    return (
        <p className="grid w-4 place-items-center font-semibold text-xl text-zinc-400">
            {pitCount ? String(pitCount) : <MinusIcon className="size-4 stroke-3 text-zinc-800" />}
        </p>
    )
}

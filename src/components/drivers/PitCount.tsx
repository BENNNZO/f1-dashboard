import SplitFlap from "@/components/ui/SplitFlap"

import { useDriver } from "./DriverContext"

export default function PitCount() {
    const { timingData } = useDriver()
    const pitCount = timingData.NumberOfPitStops

    return (
        <SplitFlap
            text={pitCount ? String(pitCount) : "0"}
            className="font-semibold text-xl text-zinc-400"
        />
    )
}

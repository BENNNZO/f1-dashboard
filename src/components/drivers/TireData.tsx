import SplitFlap from "@/components/ui/SplitFlap"

import { useDriver } from "./DriverContext"

export default function TireData() {
    const { timingAppData } = useDriver()
    const currentStint = timingAppData.Stints.at(-1)

    return (
        <SplitFlap
            className="font-semibold text-xl text-zinc-500"
            text={
                (currentStint?.TotalLaps ?? 0) < 10
                    ? `\u00A0${currentStint?.TotalLaps ?? "-"}`
                    : String(currentStint?.TotalLaps)
            }
        />
    )
}

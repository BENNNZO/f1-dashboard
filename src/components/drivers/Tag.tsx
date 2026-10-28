import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"

type TagProps = {
    timingData: TimingDataLine
    driver: DriverData
}

export default function Tag({ driver, timingData }: TagProps) {
    return (
        <div
            className="flex flex-row gap-2 px-3 py-1 font-bold text-2xl"
            style={{ background: `#${driver.TeamColour}ff` }}
        >
            <p>{Number(timingData?.Position) < 10 ? `0${timingData?.Position}` : timingData?.Position}</p>
            <p>{driver.Tla}</p>
        </div>
    )
}

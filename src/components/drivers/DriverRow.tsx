import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"

import GapTime from "./GapTime"
import LapTime from "./LapTime"
import Sectors from "./Sectors"
import Tag from "./Tag"
import TireImage from "./TireImage"

type DriverProps = {
    timingData: TimingDataLine
    driver: DriverData
}

export default function Driver({ timingData, driver }: DriverProps) {
    return (
        <div
            data-retired={timingData?.Retired ? true : undefined}
            data-pit={timingData?.InPit ? true : undefined}
            className="flex flex-row items-center gap-4 pr-2 transition-[scale,filter] duration-500 ease-snappy not-data-retired:data-pit:scale-x-97 data-pit:brightness-50 data-retired:brightness-10"
        >
            <Tag
                driver={driver}
                timingData={timingData}
            />

            <TireImage driverNumber={Number(driver.RacingNumber)} />
            <GapTime timingData={timingData} />
            <LapTime timingData={timingData} />
            <Sectors sectorData={timingData.Sectors} />
        </div>
    )
}

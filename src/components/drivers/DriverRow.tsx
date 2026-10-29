import type { CSSProperties } from "react"

import { useDriver } from "./DriverContext"
import GapTime from "./GapTime"
import LapTime from "./LapTime"
import PitCount from "./PitCount"
import PositionChange from "./PositionChange"
import Sectors from "./Sectors"
import Tag from "./Tag"
import TireData from "./TireData"
import TireImage from "./TireImage"

export default function DriverRow() {
    const { timingData, driver } = useDriver()

    return (
        <div
            data-retired={timingData?.Retired ? true : undefined}
            data-pit={timingData?.InPit ? true : undefined}
            style={{ "--team-color": `#${driver.TeamColour}` } as CSSProperties}
            className="group/driver relative px-1.5 transition-[filter] duration-500 ease-snappy data-pit:brightness-50 data-retired:brightness-50 data-retired:grayscale"
        >
            <div className="-translate-1/2 absolute top-1/2 left-0 h-3 w-20 rounded-[100%] bg-(--team-color) blur-xl" />
            <div className="absolute top-0 left-0 h-full w-1.5 bg-(--team-color) transition-[width] duration-500 ease-snappy group-data-pit/driver:w-2.5" />

            <div className="relative z-10 flex flex-row items-center gap-4">
                <Tag />
                <TireImage />
                <TireData />
                <PitCount />
                <PositionChange />
                <GapTime />
                <LapTime />
                <Sectors />
            </div>
        </div>
    )
}

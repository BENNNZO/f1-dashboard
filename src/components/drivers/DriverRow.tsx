import { motion } from "motion/react"
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
        <motion.li
            layout
            data-retired={timingData?.Retired ? true : undefined}
            data-pit={timingData?.InPit ? true : undefined}
            className="group relative z-(--driver-z) -mt-px shrink-0 overflow-hidden border-zinc-800 border-y"
            style={
                {
                    "--team-color": `#${driver.TeamColour}`,
                    "--driver-z": 100 - Number(timingData.Position),
                } as CSSProperties
            }
            transition={{
                ease: [0.2, 1, 0.2, 1],
                duration: 0.75,
            }}
        >
            <div className="-translate-1/2 absolute top-1/2 left-0 z-10 h-3 w-20 rounded-[100%] bg-(--team-color) blur-xl" />
            <div className="absolute top-0 left-0 z-10 h-full w-1.5 bg-(--team-color) transition-[width] duration-500 ease-snappy group-data-pit:w-2.5" />

            <div className="flex flex-row items-center gap-4 px-1.5 transition-[filter,background] duration-500 ease-snappy group-odd:bg-zinc-925 group-even:bg-zinc-950 group-data-pit:brightness-25 group-data-retired:brightness-25 group-data-retired:grayscale">
                <Tag />
                <TireImage />
                <TireData />
                <PitCount />
                <PositionChange />
                <GapTime />
                <LapTime />
                <Sectors />
            </div>
        </motion.li>
    )
}

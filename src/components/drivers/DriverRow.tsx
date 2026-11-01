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
    const { timingData, driver, qualifying } = useDriver()

    return (
        <motion.li
            layout
            data-retired={timingData.Retired ? true : undefined}
            data-pit={timingData.InPit ? true : undefined}
            data-drop-zone={qualifying?.inDropZone ? true : undefined}
            data-cutoff={qualifying?.atCutoff ? true : undefined}
            className="group relative z-(--driver-z) shrink-0 overflow-hidden"
            style={
                {
                    "--team-color": `#${driver.TeamColour}`,
                    "--driver-z": 100 - Number(timingData.Position),
                } as CSSProperties
            }
        >
            <div className="-translate-1/2 absolute top-1/2 left-0 z-10 h-3 w-20 rounded-[100%] bg-(--team-color) blur-xl transition-[width,opacity] duration-1000 ease-snappy group-data-pit:opacity-50" />
            <div className="-translate-1/2 absolute top-1/2 left-0 z-10 h-8 w-3 rounded-[100%] bg-(--team-color)/25 blur-sm transition-[width,opacity] duration-500 ease-snappy group-data-pit:opacity-25" />
            <div className="absolute top-0 left-0 z-10 h-[calc(100%-1px)] w-1.5 bg-(--team-color) transition-[width,opacity] duration-500 ease-snappy group-data-pit:w-2.5 group-data-pit:opacity-25" />

            <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-1 border-border border-y-[0.5px] pr-1.5 pb-1 pl-4.5 transition-[filter,background] duration-500 ease-snappy group-odd:bg-card group-even:bg-background group-data-drop-zone:border-[#260d0f] group-data-cutoff:border-b-[#260d0f]! group-data-drop-zone:bg-[#15090b]! group-data-pit:brightness-25 group-data-retired:brightness-25 group-data-retired:grayscale sm:pb-0">
                <div className="flex flex-row items-center gap-4">
                    <Tag />
                    <TireImage />
                    <TireData />
                    <PitCount />
                    <PositionChange />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <GapTime />
                    <LapTime />
                </div>

                <Sectors />
            </div>
        </motion.li>
    )
}

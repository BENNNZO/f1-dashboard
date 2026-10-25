import Image from "next/image"

import type { DriverData } from "@/types/DriverListData.type"
import type { TimingDataLine } from "@/types/TimingData.type"
import { mergeClasses } from "@/utils/mergeClasses"
import timeColor from "@/utils/timeColor"

export default function DriverMetadata({
    timingData,
    tireCompound,
    driver,
}: {
    timingData: TimingDataLine
    tireCompound: string
    driver: DriverData
}) {
    return (
        <div className="flex gap-3">
            <div
                className="flex h-8 items-center gap-2 rounded-md px-2"
                style={{ background: `#${driver.TeamColour}ff` }}
            >
                <p className="font-bold text-2xl">
                    {Number(timingData?.Position) < 10 ? `0${timingData?.Position}` : timingData?.Position}
                </p>
                <p className="font-bold text-2xl">{driver.Tla}</p>
            </div>
            <Image
                className="rounded-full outline outline-white/20"
                src={`icons/tires/${tireCompound}.svg`}
                width={32}
                height={32}
                alt="tire-picture"
            />
            <div className="flex w-22 flex-col">
                <p
                    className={mergeClasses(
                        "font-semibold text-white leading-none duration-300",
                        timingData?.IntervalToPositionAhead?.Catching && "text-green-300",
                    )}
                >
                    {timingData?.IntervalToPositionAhead?.Value === ""
                        ? "---.---"
                        : timingData?.IntervalToPositionAhead?.Value}
                </p>
                <p className="font-semibold text-sm text-white/50 leading-none">
                    {timingData?.GapToLeader === "" ? "---.---" : timingData?.GapToLeader}
                </p>
            </div>
            <div className="flex w-26 flex-col">
                <p
                    className={mergeClasses(
                        "font-semibold leading-none duration-500",
                        timeColor(timingData?.LastLapTime),
                    )}
                >
                    {timingData?.LastLapTime?.Value === "" ? "-:--.---" : timingData?.LastLapTime?.Value}
                </p>
                <p className="font-semibold text-sm text-white/50 leading-none">
                    {timingData?.BestLapTime.Value === "" ? "-:--.---" : timingData?.BestLapTime?.Value}
                </p>
            </div>
        </div>
    )
}

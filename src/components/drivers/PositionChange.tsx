import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { useDriver } from "./DriverContext"

function getStatus(positionDelta: number) {
    if (positionDelta > 0) return "gained"
    if (positionDelta < 0) return "lost"
    return "neutral"
}

export default function PositionChange() {
    const { timingData, timingAppData } = useDriver()
    const positionDelta = Number(timingAppData.GridPos) - Number(timingData.Position)
    const status = getStatus(positionDelta)

    return (
        <p
            data-gained={status === "gained" ? true : undefined}
            data-lost={status === "lost" ? true : undefined}
            data-neutral={status === "neutral" ? true : undefined}
            className="flex flex-row items-center font-semibold text-xl text-zinc-500 leading-none data-neutral:flex-row-reverse data-gained:text-emerald-500 data-lost:text-red-500"
        >
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={status}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ ease: [0.2, 1, 0.2, 1], duration: 0.5 }}
                >
                    {status === "gained" && <ChevronUpIcon className="size-3.5 stroke-3 text-zinc-300" />}

                    {status === "lost" && <ChevronDownIcon className="size-3.5 stroke-3 text-zinc-300" />}

                    {status === "neutral" && <MinusIcon className="size-4 stroke-3 text-zinc-800" />}
                </motion.span>
            </AnimatePresence>

            {status === "neutral" ? "\u00A0" : Math.abs(positionDelta)}
        </p>
    )
}

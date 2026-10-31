import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"
import { mergeClasses } from "@/utils/mergeClasses"

const STATUS_COLOR: Record<string, string> = {
    "1": "bg-emerald-500", // All Clear
    "2": "bg-amber-500", // Yellow Flag
    "4": "bg-amber-500", // SC Deployed
    "5": "bg-red-500", // Red
    "6": "bg-amber-500", // VSC Deploying
    "7": "bg-amber-500 animate-pulse", // VSC Ending
}

const MESSAGE_LABEL: Record<string, string> = {
    AllClear: "All Clear",
    Yellow: "Yellow",
    SCDeployed: "Safety Car",
    Red: "Red",
    VSCDeployed: "VSC Deployed",
    VSCEnding: "VSC Ending",
}

export default function TrackStatus() {
    const trackStatus = useWebSocketStore((state) => state.data.TrackStatus)

    if (trackStatus) {
        const color = STATUS_COLOR[trackStatus.Status]
        const label = MESSAGE_LABEL[trackStatus.Message]
        const transitionClasses = "transition-[background] duration-1000 ease-snappy"

        return (
            <motion.div
                layout
                className="relative"
            >
                <p className={mergeClasses("absolute inset-0 blur-xl", transitionClasses, color)}>{label}</p>
                <p className={mergeClasses("relative -my-1 px-3 py-1", transitionClasses, color)}>{label}</p>
            </motion.div>
        )
    }
}

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"

import { useDriver } from "./DriverContext"

export default function TireImage() {
    const { currentTyre } = useDriver()

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={currentTyre}
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ ease: [0.9, 0, 0.1, 1], duration: 1 }}
            >
                <Image
                    alt="tire-picture"
                    src={`icons/tires/${currentTyre ?? "unknown"}.svg`}
                    className="rounded-full outline outline-zinc-700"
                    width={32}
                    height={32}
                />
            </motion.div>
        </AnimatePresence>
    )
}

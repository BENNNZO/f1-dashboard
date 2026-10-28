import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"

import { useWebSocketStore } from "@/store/webSocketStore"

type TireImageProps = {
    driverNumber: number
}

export default function TireImage({ driverNumber }: TireImageProps) {
    const currentTyres = useWebSocketStore((state) => state.data.CurrentTyres)
    const currentTire = currentTyres?.Tyres[driverNumber]?.Compound.toLowerCase() ?? "unknown"

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={currentTire}
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ ease: [0.9, 0, 0.1, 1], duration: 1 }}
            >
                <Image
                    alt="tire-picture"
                    src={`icons/tires/${currentTire}.svg`}
                    className="rounded-full outline outline-white/20"
                    width={32}
                    height={32}
                />
            </motion.div>
        </AnimatePresence>
    )
}

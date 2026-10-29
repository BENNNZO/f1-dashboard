"use client"

import { AnimatePresence, motion } from "motion/react"
import type { ComponentPropsWithRef } from "react"

type SplitFlapProps = ComponentPropsWithRef<"p"> & {
    text: string
}

export default function SplitFlap({ text, ...props }: SplitFlapProps) {
    const tokens = text.split("")

    return (
        <p {...props}>
            <AnimatePresence
                mode="popLayout"
                initial={false}
            >
                {tokens.map((token, index) => (
                    <motion.span
                        // biome-ignore lint/suspicious/noArrayIndexKey: each position animates only when its character changes
                        key={`${token}-${index}`}
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        className="inline-block"
                        transition={{
                            ease: [0.2, 1, 0.2, 1],
                            duration: 0.5,
                            delay: index * 0.1,
                        }}
                    >
                        {token}
                    </motion.span>
                ))}
            </AnimatePresence>
        </p>
    )
}

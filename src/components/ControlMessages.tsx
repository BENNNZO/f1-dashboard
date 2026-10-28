import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { MessageDrs, MessageFlag, MessageOther } from "@/types/RaceControlMessages.type"

import Skeleton from "./Skeleton"

const flagTypes = {
    CHEQUERED: "🏁",
    BLUE: "🟦",
    GREEN: "🟩",
    YELLOW: "🟨",
    RED: "🟥",
}

export default function ControlMessages() {
    const raceControlMessages = useWebSocketStore((state) => state.data.RaceControlMessages)

    if (raceControlMessages) {
        return (
            <ul className="flex h-full w-full flex-col divide-y divide-white/10 overflow-x-hidden overflow-y-scroll border-zinc-800 border-t bg-zinc-925">
                {Object.values(raceControlMessages.Messages)
                    .slice()
                    .reverse()
                    .map((message: MessageOther | MessageFlag | MessageDrs) => {
                        const { Message, Category, Utc } = message

                        const hour =
                            new Date(Utc).getHours() < 10 ? `0${new Date(Utc).getHours()}` : new Date(Utc).getHours()
                        const minute =
                            new Date(Utc).getMinutes() < 10
                                ? `0${new Date(Utc).getMinutes()}`
                                : new Date(Utc).getMinutes()

                        if (Category === "Flag") {
                            const { Flag } = message as { Flag: keyof typeof flagTypes }

                            return (
                                <motion.li
                                    layout
                                    key={`${Utc}${Message}`}
                                    className="flex flex-col px-3 py-2"
                                    initial={{ scaleY: 0, y: -35 }}
                                    animate={{ scaleY: 1, y: 0 }}
                                    transition={{ ease: [0.2, 1, 0.2, 1], duration: 1 }}
                                >
                                    <p className="text-sm text-zinc-400">
                                        {hour}:{minute} - {Category}
                                    </p>

                                    <p className="">
                                        {flagTypes[Flag]} {Message}
                                    </p>
                                </motion.li>
                            )
                        }

                        return (
                            <motion.li
                                layout
                                key={`${Utc}${Message}`}
                                className="flex flex-col px-3 py-2"
                                initial={{ scaleY: 0, y: -35 }}
                                animate={{ scaleY: 1, y: 0 }}
                                transition={{ ease: [0.2, 1, 0.2, 1], duration: 1 }}
                            >
                                <p className="text-sm text-zinc-400">
                                    {hour}:{minute} - {Category}
                                </p>

                                <p className="">{Message}</p>
                            </motion.li>
                        )
                    })}
            </ul>
        )
    }

    return (
        <div className="flex h-full flex-col gap-2 overflow-x-hidden overflow-y-scroll border-zinc-800 border-t p-2">
            {[...Array(10)].map((_, i) => (
                <Skeleton
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed placeholder list that never reorders
                    key={i}
                    delay={i * 100}
                    height={Math.random() > 0.5 ? 86 : 62}
                />
            ))}
        </div>
    )
}

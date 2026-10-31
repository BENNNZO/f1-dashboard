import { motion } from "motion/react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { MessageDrs, MessageFlag, MessageOther } from "@/types/RaceControlMessages.type"

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
            <ul className="mask-y-from-[calc(100%-1rem)] scrollbar-none flex flex-col overflow-y-auto bg-card">
                {Object.values(raceControlMessages.Messages)
                    .slice()
                    .reverse()
                    .map((message: MessageOther | MessageFlag | MessageDrs) => {
                        const { Message, Category, Utc } = message

                        const hour = String(new Date(Utc).getHours()).padStart(2, "0")
                        const minute = String(new Date(Utc).getMinutes()).padStart(2, "0")

                        const flag =
                            Category === "Flag"
                                ? flagTypes[(message as { Flag: keyof typeof flagTypes }).Flag]
                                : undefined

                        return (
                            <motion.li
                                layout
                                key={`${Utc}${Message}`}
                                className="flex flex-col border-border border-b px-3 py-2"
                                initial={{ scaleY: 0, y: "-50%" }}
                                animate={{ scaleY: 1, y: 0 }}
                                transition={{ ease: [0.2, 1, 0.2, 1], duration: 1 }}
                            >
                                <p className="text-muted text-sm">
                                    {hour}:{minute} - {Category}
                                </p>

                                <p>
                                    {flag && `${flag} `}
                                    {Message}
                                </p>
                            </motion.li>
                        )
                    })}
            </ul>
        )
    }
}

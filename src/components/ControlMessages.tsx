import { useWebSocketStore } from "@/store/webSocketStore"
import type { MessageDrs, MessageFlag, MessageOther, RaceControlMessages } from "@/types/RaceControlMessages.type"

import Skeleton from "./Skeleton"

const flagTypes = {
    CHEQUERED: "🏁",
    BLUE: "🟦",
    GREEN: "🟩",
    YELLOW: "🟨",
    RED: "🟥",
}

export default function ControlMessages() {
    const raceControlMessages: RaceControlMessages | null = useWebSocketStore((state) => state.raceControlMessages)

    if (raceControlMessages) {
        return (
            <div className="flex h-full w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll border-white/10 border-t p-2">
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
                                <div
                                    key={`${Utc}${Message}`}
                                    className="flex flex-col rounded-xl border border-white/5 bg-zinc-900 px-3 py-2"
                                >
                                    <p className="text-sm text-zinc-400">
                                        {hour}:{minute} - {Category}
                                    </p>

                                    <p className="">
                                        {flagTypes[Flag]} {Message}
                                    </p>
                                </div>
                            )
                        }

                        return (
                            <div
                                key={`${Utc}${Message}`}
                                className="flex flex-col rounded-xl border border-white/5 bg-zinc-900 px-3 py-2"
                            >
                                <p className="text-sm text-zinc-400">
                                    {hour}:{minute} - {Category}
                                </p>

                                <p className="">{Message}</p>
                            </div>
                        )
                    })}
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col gap-2 overflow-x-hidden overflow-y-scroll border-white/10 border-t p-2">
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

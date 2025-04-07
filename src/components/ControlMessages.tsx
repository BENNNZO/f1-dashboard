import { useWebSocketStore } from "@/store/webSocketStore"

const flagTypes = {
    "CHEQUERED": "🏁",
    "BLUE": "🟦",
    "GREEN": "🟩",
    "YELLOW": "🟨",
    "RED": "🟥"
}

export default function ControlMessages() {
    const raceControlMessages = useWebSocketStore(state => state.raceControlMessages)

    if (raceControlMessages) return (
        <div className="flex flex-col-reverse gap-2 p-2 h-full overflow-y-scroll overflow-x-hidden border-t border-white/10">
            {Object.entries(raceControlMessages.Messages).map((message: any, index: number) => {
                console.log(message)

                const { Message, Category, Utc } = message[1]

                const hour = new Date(Utc).getHours() < 10 ? `0${new Date(Utc).getHours()}` : new Date(Utc).getHours()
                const minute = new Date(Utc).getMinutes() < 10 ? `0${new Date(Utc).getMinutes()}` : new Date(Utc).getMinutes()

                if (Category !== "Flag") {
                    return (
                        <div key={index} className="bg-zinc-900 border border-white/5 rounded-xl flex flex-col gap-2 p-2">
                            <p className="text-sm text-zinc-400">{hour}:{minute} - {Category}</p>
                            <p className="">{Message}</p>
                        </div>
                    )
                } else {
                    const { Flag } = message[1] as { Flag: keyof typeof flagTypes }

                    return (
                        <div key={index} className="bg-zinc-900 border border-white/5 rounded-xl flex flex-col gap-2 p-2">
                            <p className="text-sm text-zinc-400">{hour}:{minute} - {Category}</p>
                            <p className="">{flagTypes[Flag]} {Message}</p>
                        </div>
                    )
                }

            })}
        </div>
    )
}
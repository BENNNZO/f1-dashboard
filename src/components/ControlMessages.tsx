import { useWebSocketStore } from "@/store/webSocketStore"

export default function ControlMessages() {
    const raceControlMessages = useWebSocketStore(state => state.raceControlMessages)

    if (raceControlMessages) return (
        <div className="flex flex-col gap-2 p-2">
            {Object.entries(raceControlMessages.Messages).map((message: any, index: number) => {
                const { Message, Category } = message[1]

                return (
                    <div key={index} className="bg-zinc-900 rounded-xl flex flex-col gap-2 p-2">
                        <p className="text-sm text-zinc-400">{Category}</p>
                        <p className="">{Message}</p>
                    </div>
                )
            })}
        </div>
    )
}
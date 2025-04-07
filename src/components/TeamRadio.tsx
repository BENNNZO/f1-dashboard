import { useWebSocketStore } from "@/store/webSocketStore"

interface ICapture {
    Path: string,
    RacingNumber: string,
    Utc: string
}

export default function TeamRadio() {
    const teamRadio: Record<string, ICapture[]> = useWebSocketStore(state => state.teamRadio)
    const sessionInfo = useWebSocketStore(state => state.sessionInfo)

    console.log(teamRadio)

    if (teamRadio) return (
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden p-2 border-t border-white/10">
            {teamRadio.Captures.map((capture: ICapture) => (
                <audio className="w-full min-h-8" controls src={`https://livetiming.formula1.com/static/${sessionInfo.Path}${capture.Path}`}></audio>
            ))}
        </div>
    )
}
import { useWebSocketStore } from "@/store/webSocketStore"
import { ISessionInfo } from "@/types/ISessionInfo.type";

export default function SessionInformation() {
    const sessionInfo: ISessionInfo | null = useWebSocketStore(state => state.sessionInfo)

    if (sessionInfo) return (
        <div className="flex gap-2">
            <p className="px-4 py-1 bg-zinc-900 rounded-full h-8 border border-white/5">{sessionInfo?.Name ?? ""}</p>
            <p className="px-4 py-1 bg-zinc-900 rounded-full h-8 border border-white/5">{sessionInfo?.Meeting?.Name ?? ""}</p>
        </div>
    )
}
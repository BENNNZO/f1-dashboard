import { useWebSocketStore } from "@/store/webSocketStore"
import { ISessionInfo } from "@/types/ISessionInfo.type";

import Skeleton from "./Skeleton";

export default function SessionInformation() {
    const sessionInfo: ISessionInfo | null = useWebSocketStore(state => state.sessionInfo)

    if (sessionInfo) {
        return (
            <div className="flex gap-2">
                <p className="px-4 py-1 bg-zinc-900 rounded-full h-8 border border-white/5">{sessionInfo?.Name ?? ""}</p>
                <p className="px-4 py-1 bg-zinc-900 rounded-full h-8 border border-white/5">{sessionInfo?.Meeting?.Name ?? ""}</p>
            </div>
        )
    } else {
        return (
            <div className="flex gap-2">
                <Skeleton delay={null} width={73} height={32} rounded />
                <Skeleton delay={null} width={216} height={32} rounded />
            </div>
        )
    } 
}
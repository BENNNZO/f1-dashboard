import { useWebSocketStore } from "@/store/webSocketStore"
import type { SessionInfo } from "@/types/SessionInfo.type"

import Skeleton from "./Skeleton"

export default function SessionInformation() {
    const sessionInfo: SessionInfo | null = useWebSocketStore((state) => state.sessionInfo)

    if (sessionInfo) {
        return (
            <div className="flex gap-2">
                <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">
                    {sessionInfo?.Name ?? ""}
                </p>

                <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">
                    {sessionInfo?.Meeting?.Name ?? ""}
                </p>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            <Skeleton
                width={73}
                height={32}
                rounded
            />

            <Skeleton
                width={216}
                height={32}
                rounded
            />
        </div>
    )
}

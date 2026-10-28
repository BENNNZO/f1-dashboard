import { useWebSocketStore } from "@/store/webSocketStore"

export default function SessionInformation() {
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)

    if (sessionInfo) {
        return (
            <p>
                {sessionInfo?.Name ? `${sessionInfo?.Name} \u2014 ` : ""}
                {sessionInfo?.Meeting?.Name ?? ""}
            </p>
        )
    }
}

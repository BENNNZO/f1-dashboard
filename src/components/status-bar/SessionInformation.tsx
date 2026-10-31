import { useWebSocketStore } from "@/store/webSocketStore"

export default function SessionInformation() {
    const sessionInfo = useWebSocketStore((state) => state.data.SessionInfo)

    if (sessionInfo) {
        return (
            <p className="whitespace-normal sm:whitespace-nowrap">
                {sessionInfo.Name ? `${sessionInfo.Name} \u2014 ` : ""}
                {sessionInfo.Meeting?.Name ?? ""}
            </p>
        )
    }
}

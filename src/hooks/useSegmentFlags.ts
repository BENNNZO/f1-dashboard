import { useMemo } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { MessageFlag } from "@/types/RaceControlMessages.type"

export default function useSegmentFlags(sectorNumbers: number[]) {
    const messages = useWebSocketStore((state) => state.data.RaceControlMessages?.Messages)

    return useMemo(() => {
        const flags: Record<number, string> = Object.fromEntries(sectorNumbers.map((sector) => [sector, "CLEAR"]))

        for (const message of Object.values(messages ?? {})) {
            if (message.Category !== "Flag") continue

            const { Scope, Sector, Flag } = message as MessageFlag

            if (Scope === "Track") for (const sector of sectorNumbers) flags[sector] = Flag
            if (Scope === "Sector" && Sector) flags[Sector] = Flag
        }

        return flags
    }, [messages, sectorNumbers])
}

import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"
import type { F1Message } from "@/types/F1Message.type"

const DEMO_URL = "/demo/session.jsonl"
const LOOP_DELAY = 3000
const SPEED = 4

type LogLine = {
    timestamp: number
    message: F1Message
}

export default function useDemoFeed() {
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined
        let stopped = false

        async function start() {
            const response = await fetch(DEMO_URL)
            const lines: LogLine[] = (await response.text())
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line) => JSON.parse(line))

            if (stopped || lines.length === 0) return

            useWebSocketStore.getState().setConnection("connected")

            function play(index: number) {
                const line = lines[index]
                const next = lines[index + 1]

                useWebSocketStore.getState().storeF1Message(line.message)

                if (next) timer = setTimeout(() => play(index + 1), (next.timestamp - line.timestamp) / SPEED)
                else timer = setTimeout(() => play(0), LOOP_DELAY)
            }

            play(0)
        }

        void start()

        return () => {
            stopped = true
            clearTimeout(timer)
        }
    }, [])
}

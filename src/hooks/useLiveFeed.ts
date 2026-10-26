import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
const FIRST_RETRY_DELAY = 1000
const MAX_RETRY_DELAY = 30000

export default function useLiveFeed() {
    useEffect(() => {
        let ws: WebSocket
        let timer: ReturnType<typeof setTimeout> | undefined
        let retryDelay = FIRST_RETRY_DELAY
        let stopped = false

        function connect() {
            ws = new WebSocket(WS_URL)

            ws.onopen = () => {
                retryDelay = FIRST_RETRY_DELAY
                useWebSocketStore.getState().setConnection("connected")
            }

            ws.onmessage = (message) => {
                useWebSocketStore.getState().storeF1Message(JSON.parse(message.data))
            }

            ws.onclose = () => {
                if (stopped) return

                useWebSocketStore.getState().setConnection("reconnecting")
                timer = setTimeout(connect, retryDelay)
                retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY)
            }
        }

        connect()

        return () => {
            stopped = true
            clearTimeout(timer)
            ws.close()
        }
    }, [])
}

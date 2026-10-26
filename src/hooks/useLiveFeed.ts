import { useEffect } from "react"

import { useWebSocketStore } from "@/store/webSocketStore"

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
const FIRST_RETRY_DELAY = 1000
const MAX_RETRY_DELAY = 30000

async function updateData(type: string, data: unknown) {
    const store = useWebSocketStore.getState()

    switch (type) {
        case "TimingAppData":
            store.updateTimingAppData(data as Record<string, unknown>)
            break
        case "WeatherData":
            store.updateWeatherData(data as Record<string, unknown>)
            break
        case "TrackStatus":
            store.updateTrackStatus(data as Record<string, unknown>)
            break
        case "DriverList":
            store.updateDriverList(data as Record<string, unknown>)
            break
        case "RaceControlMessages":
            store.updateRaceControlMessages(data as Record<string, unknown>)
            break
        case "SessionInfo":
            store.updateSessionInfo(data as Record<string, unknown>)
            break
        case "LapCount":
            store.updateLapCount(data as Record<string, unknown>)
            break
        case "TimingData":
            store.updateTimingData(data as Record<string, unknown>)
            break
        case "TeamRadio":
            store.updateTeamRadio(data as Record<string, unknown>)
            break
        default:
            break
    }
}

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
                const { type, data }: { type: string; data: Record<string, unknown> } = JSON.parse(message.data)

                if (type === "init") {
                    useWebSocketStore.getState().reset()
                    Object.keys(data).forEach((key) => {
                        void updateData(key, data[key])
                    })
                } else {
                    void updateData(type, data)
                }
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

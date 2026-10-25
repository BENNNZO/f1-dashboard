import ws from "ws"

import { F1_CONSTANTS } from "../config/constants"
import negotiate from "../utils/f1Negotiate"

export type F1Message = {
    type: string
    data: unknown
}

type SignalRMessage = {
    type: number
    target?: string
    arguments?: [string, unknown, string]
    result?: Record<string, unknown>
    error?: string
}

const RECORD_SEPARATOR = "\x1e"

function send(socket: ws, message: object) {
    socket.send(JSON.stringify(message) + RECORD_SEPARATOR)
}

function toF1Message(message: SignalRMessage): F1Message | undefined {
    if (message.type === 3 && message.result) {
        return { type: "init", data: message.result }
    }

    if (message.type === 1 && message.target === "feed" && message.arguments){
        return { type: message.arguments[0], data: message.arguments[1] }
    }
}

export default async function f1WebSocketServer(onMessage: (message: F1Message) => void): Promise<ws> {
    const { BASE_URL, PING_INTERVAL, SUBSCRIPTION_TOPICS } = F1_CONSTANTS
    const { encodedToken, cookie } = await negotiate()

    const socketURL = `wss://${BASE_URL}?id=${encodedToken}`

    const headers = {
        "User-Agent": "BestHTTP",
        "Accept-Encoding": "gzip,identity",
        Cookie: cookie,
    }

    return new Promise((res, rej) => {
        const socket = new ws(socketURL, { headers })
        let pingTimer: NodeJS.Timeout

        socket.on("open", () => {
            console.log("[F1 WebSocket] Connected to F1 WebSocket")

            send(socket, { protocol: "json", version: 1 })
            send(socket, { type: 1, target: "Subscribe", arguments: [SUBSCRIPTION_TOPICS], invocationId: "1" })

            pingTimer = setInterval(() => send(socket, { type: 6 }), PING_INTERVAL)

            res(socket)
        })

        socket.on("message", (data) => {
            for (const frame of data.toString().split(RECORD_SEPARATOR)) {
                if (!frame) continue

                const message: SignalRMessage = JSON.parse(frame)

                if (message.error) {
                    console.error(`[F1 WebSocket] Error: ${message.error}`)
                }

                const f1Message = toF1Message(message)

                if (f1Message) {
                    onMessage(f1Message)
                }
            }
        })

        socket.on("error", (err) => {
            rej(new Error(`[F1 WebSocket] Error: ${(err as Error).message}`))
        })

        socket.on("close", (code, reason) => {
            clearInterval(pingTimer)
            console.log(`[F1 WebSocket] Closed: ${code} - ${reason}`)
        })
    })
}

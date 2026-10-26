import ws from "ws"

import { F1_CONSTANTS } from "../config/constants"
import log from "../log"
import negotiate from "./negotiate"

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

const MESSAGE_TYPE = {
    INVOCATION: 1,
    COMPLETION: 3,
    PING: 6,
} as const

function send(socket: ws, message: object) {
    socket.send(JSON.stringify(message) + RECORD_SEPARATOR)
}

function toF1Message(message: SignalRMessage): F1Message | undefined {
    if (message.type === MESSAGE_TYPE.COMPLETION && message.result) {
        return { type: "init", data: message.result }
    }

    if (message.type === MESSAGE_TYPE.INVOCATION && message.target === "feed" && message.arguments) {
        return { type: message.arguments[0], data: message.arguments[1] }
    }
}

function handleFrame(frame: string, onMessage: (message: F1Message) => void) {
    try {
        const message: SignalRMessage = JSON.parse(frame)

        if (message.error) {
            log("F1", `Error: ${message.error}`, "error")
        }

        const f1Message = toF1Message(message)
        const isHandshakeReply = message.type === undefined
        const isPing = message.type === MESSAGE_TYPE.PING

        if (f1Message) {
            onMessage(f1Message)
        } else if (!(isHandshakeReply || isPing)) {
            log("F1", `Unknown message: ${frame}`, "warn")
        }
    } catch (err) {
        log("F1", `Bad message: ${(err as Error).message} ${frame}`, "error")
    }
}

export default function connectToF1(onMessage: (message: F1Message) => void) {
    // biome-ignore format: one name per line
    const {
        BASE_URL,
        PING_INTERVAL,
        RETRY_DELAY_MIN,
        RETRY_DELAY_MAX,
        WATCHDOG_TIMEOUT,
        SUBSCRIPTION_TOPICS,
    } = F1_CONSTANTS
    let retryDelay = RETRY_DELAY_MIN

    function reconnect() {
        log("F1", `Reconnecting in ${retryDelay / 1000}s`)
        setTimeout(start, retryDelay)
        retryDelay = Math.min(retryDelay * 2, RETRY_DELAY_MAX)
    }

    function start() {
        connect().catch((err) => {
            log("F1", `Connect failed: ${(err as Error).message}`, "error")
            reconnect()
        })
    }

    async function connect() {
        const { encodedToken, cookie } = await negotiate()

        const socketURL = `wss://${BASE_URL}?id=${encodedToken}`

        const headers = {
            "User-Agent": "BestHTTP",
            "Accept-Encoding": "gzip,identity",
            Cookie: cookie,
        }

        const socket = new ws(socketURL, { headers })
        let pingTimer: NodeJS.Timeout
        let watchdogTimer: NodeJS.Timeout

        function resetWatchdog() {
            clearTimeout(watchdogTimer)
            watchdogTimer = setTimeout(() => {
                log("F1", "No message for 2 min", "warn")
                socket.terminate()
            }, WATCHDOG_TIMEOUT)
        }

        resetWatchdog()

        socket.on("open", () => {
            log("F1", "Connected to F1 WebSocket")

            send(socket, { protocol: "json", version: 1 })
            send(socket, {
                type: MESSAGE_TYPE.INVOCATION,
                target: "Subscribe",
                arguments: [SUBSCRIPTION_TOPICS],
                invocationId: "1",
            })

            pingTimer = setInterval(() => send(socket, { type: MESSAGE_TYPE.PING }), PING_INTERVAL)

            retryDelay = RETRY_DELAY_MIN
        })

        socket.on("message", (data) => {
            resetWatchdog()

            for (const frame of data.toString().split(RECORD_SEPARATOR)) {
                if (!frame) continue

                handleFrame(frame, onMessage)
            }
        })

        socket.on("error", (err) => {
            log("F1", `Error: ${err.message}`, "error")
        })

        socket.on("close", (code, reason) => {
            clearInterval(pingTimer)
            clearTimeout(watchdogTimer)
            log("F1", `Closed: ${code} - ${reason}`)
            reconnect()
        })
    }

    start()
}

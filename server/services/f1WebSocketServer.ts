import ws from "ws";

import { F1_CONSTANTS } from "../config/constants";

import negotiate from "../utils/f1Negotiate";

export default async function f1WebSocketServer(): Promise<ws> {
    const { BASE_URL, CONNECTION_DATA } = F1_CONSTANTS
    const { encodedToken, cookie } = await negotiate()

    const socketURL = `wss://${BASE_URL}/connect?transport=webSockets&clientProtocol=1.5&connectionToken=${encodedToken}&connectionData=${CONNECTION_DATA}`

    const headers = {
        'User-Agent': 'BestHTTP',
        'Accept-Encoding': 'gzip,identity',
        'Cookie': cookie
    }

    return new Promise((res, rej) => {
        const socket = new ws(socketURL, { headers })

        socket.on("open", () => {
            console.log("[F1 WebSocket] Connected to F1 WebSocket")

            socket.send(JSON.stringify({
                "H": "Streaming",
                "M": "Subscribe",
                "A": [["Heartbeat", "LapCount"]],
                "I": 1
            }))

            res(socket)
        })

        socket.on("message", message => {
            console.log(`[F1 WebSocket] Message: ${message}`)
        })

        socket.on("error", err => {
            rej(new Error(`[F1 WebSocket] Error: ${(err as Error).message}`))
        })

        socket.on("close", (code, reason) => {
            console.log(`[F1 WebSocket] Closed: ${code} - ${reason}`)
        })
    })
}
import { WebSocket, type WebSocketServer } from "ws"

import type { F1Message } from "../f1/connection"

export default function broadcast(wss: WebSocketServer, message: F1Message) {
    const json = JSON.stringify(message)

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(json)
    })
}

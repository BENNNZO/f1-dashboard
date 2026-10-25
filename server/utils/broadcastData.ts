import { WebSocket, type WebSocketServer } from "ws"

export default function broadcastData(wss: WebSocketServer, data: { type: string; data: unknown }) {
    const message = JSON.stringify(data)

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(message)
    })
}

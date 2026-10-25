import { WebSocket, type WebSocketServer } from "ws"

export default function broadcastData(wss: WebSocketServer, data: { type: string; data: unknown }) {
    console.log(`[BROADCAST] Broadcasting data to clients...`)

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data))
        } else {
            console.error("[BROADCAST] Client not ready", client.url)
        }
    })
}

import { WebSocketServer, WebSocket } from "ws"

export default function broadcastData(wss: WebSocketServer, data: any) {
    console.log(`[BROADCAST] Broadcasting data to clients...`)
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            try {
                client.send(JSON.parse(data))
            } catch (err) {
                client.send(JSON.stringify(data))
            }
        } else {
            console.error("[BROADCAST] Client not ready", client.url)
        }
    })
}
import { WebSocketServer } from "ws"

export default function broadcastData(wss: WebSocketServer, data: any) {
    console.log(`[DASH] Broadcasting data to clients: ${data}`)
    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log(client.url)
            client.send(JSON.parse(data.toString()))
        } else {
            console.error("[DASH] Client not ready", client.url)
        }
    })
}
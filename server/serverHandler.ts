import f1WebSocketServer from "./services/f1WebSocketServer"
import myWebSocketServer from "./services/myWebSocketServer"
import broadcastData from "./utils/broadcastData"
import { storeF1Message } from "./utils/updateDataStore"

const PORT = process.env.PORT || 3001

async function startServer() {
    try {
        console.log("[Dashboard Server] Starting Server...")

        const wss = await myWebSocketServer(Number(PORT))

        f1WebSocketServer((message) => {
            storeF1Message(message)
            broadcastData(wss, message)
        })
    } catch (err) {
        throw new Error(`Failed to initialize the servers: ${(err as Error).message}`)
    }
}

void startServer()

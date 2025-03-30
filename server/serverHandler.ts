import f1WebSocketServer from './services/f1WebSocketServer';
import myWebSocketServer from './services/myWebSocketServer'
import broadcastData from './utils/broadcastData';
import { updateDataStore } from "./utils/updateDataStore"

async function startServer() {
    try {
        const f1Socket = await f1WebSocketServer()
        const wss = await myWebSocketServer()
        
        f1Socket.on("message", data => {
            updateDataStore(data)
            broadcastData(wss, data)
        })
    } catch (err) {
        throw new Error(`Failed to initialize the servers: ${(err as Error).message}`)
    }
}

startServer()
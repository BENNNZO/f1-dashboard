import f1WebSocketServer from './services/f1WebSocketServer'
import myWebSocketServer from './services/myWebSocketServer'
import broadcastData from './utils/broadcastData'
import { updateDataStore } from "./utils/updateDataStore"

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        console.log("[Dashboard Server] Starting Server...")

        const f1Socket = await f1WebSocketServer()
        const wss = await myWebSocketServer(Number(PORT))

        f1Socket.on("message", (data: string) => {
            const message = JSON.parse(data)

            if (message["R"]) {
                updateDataStore(message["R"])
                broadcastData(wss, { type: "init", data: message["R"] })
            }

            message["M"]?.forEach((item: any) => {
                const type = item["A"][0]
                const data = item["A"][1]
                
                updateDataStore({ [type]: data })
                broadcastData(wss, { type, data })
            })
        })
    } catch (err) {
        throw new Error(`Failed to initialize the servers: ${(err as Error).message}`)
    }
}

startServer()
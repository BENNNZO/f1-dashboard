import { SERVER_CONSTANTS } from "./config/constants"
import f1WebSocketServer from "./services/f1WebSocketServer"
import myWebSocketServer from "./services/myWebSocketServer"
import broadcastData from "./utils/broadcastData"
import log from "./utils/log"
import { storeF1Message } from "./utils/updateDataStore"

async function startServer() {
    try {
        log("SERVER", "Starting Server...")

        const wss = await myWebSocketServer(SERVER_CONSTANTS.PORT)

        f1WebSocketServer((message) => {
            storeF1Message(message)
            broadcastData(wss, message)
        })
    } catch (err) {
        throw new Error(`Failed to initialize the servers: ${(err as Error).message}`)
    }
}

void startServer()

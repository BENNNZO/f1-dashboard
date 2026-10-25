import broadcastData from "./browser/broadcast"
import myWebSocketServer from "./browser/server"
import { SERVER_CONSTANTS } from "./config/constants"
import { storeF1Message } from "./dataStore"
import f1WebSocketServer from "./f1/connection"
import log from "./log"

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

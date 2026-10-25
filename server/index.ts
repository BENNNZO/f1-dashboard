import broadcastData from "./browser/broadcast"
import startBrowserServer from "./browser/server"
import { SERVER_CONSTANTS } from "./config/constants"
import { storeF1Message } from "./dataStore"
import connectToF1 from "./f1/connection"
import log from "./log"

async function startServer() {
    try {
        log("SERVER", "Starting Server...")

        const wss = await startBrowserServer(SERVER_CONSTANTS.PORT)

        connectToF1((message) => {
            storeF1Message(message)
            broadcastData(wss, message)
        })
    } catch (err) {
        throw new Error(`Failed to initialize the servers: ${(err as Error).message}`)
    }
}

void startServer()

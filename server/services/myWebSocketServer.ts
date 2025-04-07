import { WebSocketServer} from 'ws';

import { SERVER_CONSTANTS } from '../config/constants';
import { currentData } from '../utils/updateDataStore';

export default async function startServer(): Promise<WebSocketServer> {
    return new Promise((res, rej) => {
        try {
            const wss = new WebSocketServer({ port: SERVER_CONSTANTS.PORT })

            wss.on("connection", (event) => {
                console.log("[SERVER] Client Connected")
                event.send(JSON.stringify({ type: "init", data: currentData }))
                // broadcastData(wss, { type: "test", data: currentData })
            })

            wss.on("close", () => {
                console.log("[SERVER] Client Disconnected")
            })

            wss.on("error", err => {
                rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
            })

            res(wss) // Resolve here, not inside a nonexistent 'open' event
        } catch (err) {
            rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
        }
    })
}
import { WebSocketServer } from "ws"

import log from "../utils/log"
import { currentData } from "../utils/updateDataStore"

export default async function myWebSocketServer(port: number): Promise<WebSocketServer> {
    return new Promise((res, rej) => {
        try {
            const wss = new WebSocketServer({
                port,
                host: "0.0.0.0",
            })

            wss.on("connection", (event) => {
                log("SERVER", "Client Connected")
                event.send(JSON.stringify({ type: "init", data: currentData }))

                event.on("close", () => {
                    log("SERVER", "Client Disconnected")
                })
            })

            wss.on("error", (err) => {
                rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
            })

            res(wss) // Resolve here, not inside a nonexistent 'open' event
        } catch (err) {
            rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
        }
    })
}

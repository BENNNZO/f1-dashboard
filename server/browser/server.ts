import { WebSocketServer } from "ws"

import { currentData } from "../dataStore"
import log from "../log"

export default async function startBrowserServer(port: number): Promise<WebSocketServer> {
    return new Promise((res, rej) => {
        try {
            const wss = new WebSocketServer({ port })

            wss.on("connection", (client) => {
                log("SERVER", "Client Connected")
                client.send(JSON.stringify({ type: "init", data: currentData }))

                client.on("close", () => {
                    log("SERVER", "Client Disconnected")
                })
            })

            wss.on("error", (err) => {
                rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
            })

            wss.on("listening", () => res(wss))
        } catch (err) {
            rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
        }
    })
}

import { WebSocketServer} from 'ws';

import { SERVER_CONSTANTS } from '../config/constants';

export default async function startServer(): Promise<WebSocketServer> {
    return new Promise((res, rej) => {
        const wss = new WebSocketServer({ port: SERVER_CONSTANTS.PORT })
        
        wss.on("open", () => res(wss))

        wss.on("connection", () => {
            console.log("[SERVER] Client Connected")
        })
        
        wss.on("close", () => {
            console.log("[SERVER] Client Disconnected")
        })

        wss.on("error", err => {
            rej(new Error(`[SERVER] Failed to initialize the web socket server: ${(err as Error).message}`))
        })
    })
}
import { WebSocketServer} from 'ws';

import { SERVER_CONSTANTS } from '../config/constants';
import f1WebSocketServer from './f1WebSocketServer';
import broadcastData from '../utils/broadcastData';

async function startServer() {
    try {
        const f1Socket = await f1WebSocketServer()
        const wss = new WebSocketServer({ port: SERVER_CONSTANTS.PORT })
        
        wss.on("connection", () => {
            console.log("[DASH] Client Connected")
        })
        
        wss.on("close", () => {
            console.log("[DASH] Client Disconnected")
        })
        
        f1Socket.on("message", data => broadcastData(wss, data))
    } catch (err) {
        throw new Error(`Failed to initialize the server: ${(err as Error).message}`)
    }
}

startServer()
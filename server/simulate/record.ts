import { WebSocketServer} from 'ws';

import { SERVER_CONSTANTS } from '../config/constants';
import f1WebSocketServer from '../services/f1WebSocketServer';
import broadcastData from '../utils/broadcastData';

import fs from "fs"

const logFilePath = `${__dirname}/logs/`
const logFileName = `${new Date().toISOString().replaceAll(":", "-")}.txt`

async function startRecording() {
    console.log(`[RECORD] Recording data to ${logFileName}`)

    try {
        const f1Socket = await f1WebSocketServer()
        
        f1Socket.on("message", data => {
            const timestamp = Date.now()

            fs.appendFile(logFilePath + logFileName, `{"timestamp": ${timestamp}, "message": ${data.toString()}}\n`, err => {
                if (err) console.error(err)
                    else console.log(`${timestamp}: [RECORD] Log Updated: ${logFileName}`)
            })
        })
    } catch (err) {
        throw new Error(`Failed to initialize the server: ${(err as Error).message}`)
    }
}

startRecording()
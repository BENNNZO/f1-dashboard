import { WebSocketServer } from 'ws';
import fs from "fs"
import readline from "readline"


import { SERVER_CONSTANTS } from '../config/constants';
import broadcastData from '../utils/broadcastData';

// test for arguments and if the file exists
if (!process.argv[2]) throw new Error("Missing log file name argument (npm run simulate *log file name*)")
if (!fs.existsSync(`${__dirname}/logs/${process.argv[2]}.txt`)) throw new Error(`Log file ${process.argv[2]}.txt does not exist`)

async function startSimulation() {
    try {
        const wss = new WebSocketServer({ port: SERVER_CONSTANTS.PORT })

        console.log(`[SIMULATE] Server Started on PORT: ${SERVER_CONSTANTS.PORT}`)

        wss.on("connection", async () => {
            console.log("[SIMULATE] Client Connected")

            const fileStream = fs.createReadStream(`${__dirname}/logs/${process.argv[2]}.txt`)
            const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

            let previousTimestamp: number = 0

            for await (const line of rl) {
                const { timestamp, message } = JSON.parse(line)

                if (previousTimestamp > 0) await new Promise(res => setTimeout(res, timestamp - previousTimestamp))

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        // console.log(client.url)
                        client.send(JSON.stringify(message))
                    } else {
                        console.error("[SIMULATE] Client not ready", client.url)
                    }
                })

                previousTimestamp = timestamp
            }
        })

        wss.on("close", () => {
            console.log("[SIMULATE] Client Disconnected")
        })
    } catch (err) {
        throw new Error(`Failed to initialize the server: ${(err as Error).message}`)
    }
}

startSimulation()
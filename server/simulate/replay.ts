import { WebSocketServer } from 'ws';
import fs from "fs"
import readline from "readline"

import { SERVER_CONSTANTS } from '../config/constants';
import { updateDataStore } from '../utils/updateDataStore';
import broadcastData from '../utils/broadcastData';

interface IMessageItem {
    H: string,
    M: string,
    A: [
        string,
        object,
        string
    ]
}

// test for arguments and if the file exists
if (!process.argv[2]) throw new Error("Missing log file name argument (npm run simulate *log file name*)")
if (!fs.existsSync(`${__dirname}/logs/${process.argv[2]}.txt`)) throw new Error(`Log file ${process.argv[2]}.txt does not exist`)

async function startReplay() {
    try {
        const wss = new WebSocketServer({ port: SERVER_CONSTANTS.PORT })

        console.log(`[REPLAY] Server Started on PORT: ${SERVER_CONSTANTS.PORT}`)

        wss.on("connection", async () => {
            console.log("[REPLAY] Client Connected")

            const fileStream = fs.createReadStream(`${__dirname}/logs/${process.argv[2]}.txt`)
            const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

            let previousTimestamp: number = 0

            for await (const line of rl) {
                const { timestamp, message } = JSON.parse(line)

                // delay between this and previous message
                if (previousTimestamp > 0) await new Promise(res => setTimeout(res, timestamp - previousTimestamp))

                if (message["R"]) {
                    updateDataStore(message["R"])
                    broadcastData(wss, message["R"])
                }

                message["M"]?.forEach((item: IMessageItem) => {
                    const type = item["A"][0]
                    const data = item["A"][1]
                    
                    updateDataStore({ [type]: data })
                    broadcastData(wss, { type, data })
                })

                previousTimestamp = timestamp
            }

            console.log("[REPLAY] Replay Finished")
        })

        wss.on("close", () => {
            console.log("[REPLAY] Client Disconnected")
        })
    } catch (err) {
        throw new Error(`Failed to initialize the server: ${(err as Error).message}`)
    }
}

startReplay()
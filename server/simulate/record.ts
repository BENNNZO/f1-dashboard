import fs from "node:fs"
import readline from "node:readline/promises"

import f1WebSocketServer from "../services/f1WebSocketServer"
import type { LogLine } from "./types"

const logFilePath = `${__dirname}/logs/`
const logFileName = `${new Date().toISOString().replaceAll(":", "-")}.txt`

async function startRecording() {
    if (!fs.existsSync(logFilePath)) {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        const answer = await rl.question(`[RECORD] Log folder ${logFilePath} does not exist. Create it? (y/n) `)
        rl.close()

        if (answer.trim().toLowerCase() !== "y") {
            console.log("[RECORD] Log folder not created. Recording stopped.")
            return
        }

        fs.mkdirSync(logFilePath)
    }

    console.log(`[RECORD] Recording data to ${logFileName}`)

    try {
        let messageCount = 0

        await f1WebSocketServer((message) => {
            const logLine: LogLine = { timestamp: Date.now(), message }

            fs.appendFile(
                logFilePath + logFileName,
                `${JSON.stringify(logLine)}\n`,
                (err) => {
                    if (err) return console.error(err)

                    messageCount++
                    if (messageCount % 100 === 0)
                        console.log(`[RECORD] ${messageCount} messages saved to ${logFileName}`)
                },
            )
        })
    } catch (err) {
        throw new Error(`Failed to initialize the server: ${(err as Error).message}`)
    }
}

void startRecording()

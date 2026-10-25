import fs from "node:fs"
import readline from "node:readline/promises"

import f1WebSocketServer, { type F1Message } from "../services/f1WebSocketServer"
import type { LogLine } from "./types"

const logFilePath = `${__dirname}/logs/`
const logFileName = `${new Date().toISOString().replaceAll(":", "-")}.txt`

let messageCount = 0

async function ensureLogFolder() {
    if (fs.existsSync(logFilePath)) return true

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const answer = await rl.question(`[RECORD] Log folder ${logFilePath} does not exist. Create it? (y/n) `)
    rl.close()

    if (answer.trim().toLowerCase() !== "y") {
        console.log(`[RECORD] Stopped. The log folder does not exist: ${logFilePath}`)
        return false
    }

    fs.mkdirSync(logFilePath)
    return true
}

function writeLogLine(message: F1Message) {
    const logLine: LogLine = { timestamp: Date.now(), message }

    fs.appendFile(logFilePath + logFileName, `${JSON.stringify(logLine)}\n`, (err) => {
        if (err) return console.error(err)

        messageCount++
        if (messageCount % 100 === 0) console.log(`[RECORD] ${messageCount} messages saved to ${logFileName}`)
    })
}

async function startRecording() {
    if (!(await ensureLogFolder())) return

    console.log(`[RECORD] Recording data to ${logFileName}`)

    try {
        await f1WebSocketServer(writeLogLine)
    } catch (err) {
        throw new Error(`[RECORD] Could not connect to the F1 feed: ${(err as Error).message}`)
    }
}

void startRecording()

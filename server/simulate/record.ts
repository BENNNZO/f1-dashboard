import fs from "node:fs"
import readline from "node:readline/promises"

import f1WebSocketServer, { type F1Message } from "../f1/connection"
import log from "../log"
import type { LogLine } from "./types"

const logFilePath = `${__dirname}/logs/`
const logFileName = `${new Date().toISOString().replaceAll(":", "-")}.jsonl`

let messageCount = 0

async function ensureLogFolder() {
    if (fs.existsSync(logFilePath)) return true

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const answer = await rl.question(`[RECORD] Log folder ${logFilePath} does not exist. Create it? (y/n) `)
    rl.close()

    if (answer.trim().toLowerCase() !== "y") {
        log("RECORD", `Stopped. The log folder does not exist: ${logFilePath}`)
        return false
    }

    fs.mkdirSync(logFilePath)
    return true
}

function writeLogLine(message: F1Message) {
    const logLine: LogLine = { timestamp: Date.now(), message }

    fs.appendFile(logFilePath + logFileName, `${JSON.stringify(logLine)}\n`, (err) => {
        if (err) return log("RECORD", err.message, "error")

        messageCount++
        if (messageCount % 100 === 0) log("RECORD", `${messageCount} messages saved to ${logFileName}`)
    })
}

async function startRecording() {
    if (!(await ensureLogFolder())) return

    log("RECORD", `Recording data to ${logFileName}`)

    f1WebSocketServer(writeLogLine)
}

void startRecording()

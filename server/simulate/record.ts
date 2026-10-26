import fs from "node:fs"
import readline from "node:readline/promises"

import connectToF1, { type F1Message } from "../f1/connection"
import log from "../log"
import type { LogLine } from "./types"

const logFolder = `${__dirname}/logs/`
const logFileName = `${new Date().toISOString().replaceAll(":", "-")}.jsonl`

let messageCount = 0

async function ensureLogFolder() {
    if (fs.existsSync(logFolder)) return true

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const answer = await rl.question(`[RECORD] Log folder ${logFolder} does not exist. Create it? (y/n) `)
    rl.close()

    if (answer.trim().toLowerCase() !== "y") {
        log("RECORD", `Stopped. The log folder does not exist: ${logFolder}`)
        return false
    }

    fs.mkdirSync(logFolder)
    return true
}

function writeLogLine(message: F1Message) {
    const logLine: LogLine = { timestamp: Date.now(), message }

    fs.appendFile(logFolder + logFileName, `${JSON.stringify(logLine)}\n`, (err) => {
        if (err) return log("RECORD", err.message, "error")

        messageCount++
        if (messageCount % 100 === 0) log("RECORD", `${messageCount} messages saved to ${logFileName}`)
    })
}

async function startRecording() {
    if (!(await ensureLogFolder())) return

    log("RECORD", `Recording data to ${logFileName}`)

    connectToF1(writeLogLine)
}

void startRecording()

import fs from "node:fs"
import readline from "node:readline"
import type { WebSocketServer } from "ws"

import broadcastData from "../browser/broadcast"
import startBrowserServer from "../browser/server"
import { SERVER_CONSTANTS } from "../config/constants"
import { storeF1Message } from "../dataStore"
import log from "../log"
import type { LogLine } from "./types"

const logFolder = `${__dirname}/logs/`
const logFileName = process.argv[2]?.replace(".jsonl", "")
const logFile = `${logFolder}${logFileName}.jsonl`

if (!logFileName) {
    log("REPLAY", "Missing log name.\nUsage: pnpm replay <log name>", "error")
    process.exit(1)
}

if (!fs.existsSync(logFile)) {
    log("REPLAY", `Log not found: ${logFile}`, "error")
    process.exit(1)
}

async function replayLog(wss: WebSocketServer) {
    const fileStream = fs.createReadStream(logFile)
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

    let previousTimestamp: number = 0

    for await (const line of rl) {
        try {
            const { timestamp, message }: LogLine = JSON.parse(line)

            if (previousTimestamp > 0) await new Promise((res) => setTimeout(res, (timestamp - previousTimestamp) / 4))

            storeF1Message(message)
            broadcastData(wss, message)

            previousTimestamp = timestamp
        } catch (err) {
            log("REPLAY", `Bad line: ${(err as Error).message} ${line}`, "error")
        }
    }

    log("REPLAY", "Replay Finished")
}

async function startReplay() {
    try {
        const wss = await startBrowserServer(SERVER_CONSTANTS.PORT)

        log("REPLAY", `Server Started on PORT: ${SERVER_CONSTANTS.PORT}`)

        wss.once("connection", () => void replayLog(wss))
    } catch (err) {
        throw new Error(
            `[REPLAY] Could not start the replay server on port ${SERVER_CONSTANTS.PORT}: ${(err as Error).message}`,
        )
    }
}

void startReplay()

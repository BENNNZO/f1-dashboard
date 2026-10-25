import type { F1Message } from "../services/f1WebSocketServer"

export type LogLine = {
    timestamp: number
    message: F1Message
}

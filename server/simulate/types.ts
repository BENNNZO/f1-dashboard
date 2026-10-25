import type { F1Message } from "../f1/connection"

export type LogLine = {
    timestamp: number
    message: F1Message
}

type LogSource = "SERVER" | "F1" | "RECORD" | "REPLAY"
type LogLevel = "log" | "warn" | "error"

export default function log(source: LogSource, message: string, level: LogLevel = "log") {
    console[level](`[${source}] ${message}`)
}

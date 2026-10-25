export type RaceControlMessages = {
    Messages: (MessageOther | MessageFlag | MessageDrs)[]
}

export type MessageOther = {
    Category: string
    Message: string
    Lap: number
    Utc: string
}

export type MessageFlag = {
    Category: string
    Message: string
    Lap: number
    Utc: string
    Flag: string
    Scope: string
}

export type MessageDrs = {
    Category: string
    Message: string
    Lap: number
    Utc: string
    Status: string
}

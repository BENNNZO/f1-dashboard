export type IRaceControlMessages = {
    Messages: (IMessageOther | IMessageFlag | IMessageDrs)[]
}

export type IMessageOther = {
    Category: string,
    Message: string,
    Lap: number,
    Utc: string
}

export type IMessageFlag = {
    Category: string,
    Message: string,
    Lap: number,
    Utc: string,
    Flag: string,
    Scope: string
}

export type IMessageDrs = {
    Category: string,
    Message: string,
    Lap: number,
    Utc: string,
    Status: string
}
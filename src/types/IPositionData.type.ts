export type IPositionData = IPositionDataObject[]

export type IPositionDataObject = {
    Timestamp: string,
    Entries: Record<string, IPositionEntry>
}

export type IPositionEntry = {
    Status: string,
    X: number,
    Y: number,
    Z: number
}
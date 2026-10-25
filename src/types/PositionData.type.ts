export type PositionData = PositionDataObject[]

export type PositionDataObject = {
    Timestamp: string
    Entries: Record<string, PositionEntry>
}

export type PositionEntry = {
    Status: string
    X: number
    Y: number
    Z: number
}

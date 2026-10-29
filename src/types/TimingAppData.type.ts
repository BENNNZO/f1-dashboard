export type TimingAppData = {
    Lines: Record<string, TimingAppDataLine>
}

export type TimingAppDataLine = {
    GridPos: string
    Line: number
    RacingNumber: string
    Stints: Stint[]
}

export type Stint = {
    LapTime: string
    LapNumber: number
    LapFlags: number
    Compound: string
    New: boolean
    TyresNotChanged: string
    TotalLaps: number
    StartLaps: number
}

export type TimingData = {
    Lines: Record<string, TimingDataLine>
    Withheld: boolean
}

export type TimingDataLine = {
    GapToLeader?: string
    IntervalToPositionAhead?: {
        Value: string
        Catching: boolean
    }
    TimeDiffToFastest?: string
    TimeDiffToPositionAhead?: string
    Line: number
    Position: string
    ShowPosition: boolean
    RacingNumber: string
    Retired: boolean
    InPit: boolean
    PitOut: boolean
    Stopped: boolean
    Status: number
    NumberOfLaps: number
    Sectors: Sector[]
    Speeds: Record<string, Speed>
    BestLapTime: BestLapTime
    LastLapTime: LastLapTime
    NumberOfPitStops: number
}

export type Sector = {
    Stopped: boolean
    PreviousValue: string
    Segments: Segment[]
    Value: string
    Status: number
    OverallFastest: boolean
    PersonalFastest: boolean
}

export type Segment = {
    Status: number
}

export type BestLapTime = {
    Value: string
    Lap: number
}

export type LastLapTime = {
    Value: string
    Status: number
    OverallFastest: boolean
    PersonalFastest: boolean
}

export type Speed = {
    Value: string
    Status: number
    OverallFastest: boolean
    PersonalFastest: boolean
}

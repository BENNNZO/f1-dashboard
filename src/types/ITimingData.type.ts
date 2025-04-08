export type ITimingData = {
    Lines: Record<string, ITimingDataLine>
}

export type ITimingDataLine = {
    GapToLeader: string,
    IntervalToPositionAhead: {
        Value: string,
        Catching: boolean
    },
    Line: number,
    Position: string,
    ShowPosition: boolean,
    RacingNumber: string,
    Retired: boolean,
    InPit: boolean,
    PitOut: boolean,
    Stopped: boolean,
    Status: number,
    NumberOfLaps: number,
    Sectors: ISector[],
    Speeds: Record<string, ISpeed>
    BestLapTime: IBestLapTime,
    LastLapTime: ILastLapTime,
    NumberOfPitStops: number
}

export type ISector = {
    Stopped: boolean,
    PreviousValue: string,
    Segments: ISegment[],
    Value: string,
    Status: number,
    OverallFastest: boolean,
    PersonalFastest: boolean
}

export type ISegment = {
    Status: number
}

export type IBestLapTime = {
    Value: string,
    Lap: number
}

export type ILastLapTime = {
    Value: string,
    Status: number,
    OverallFastest: boolean,
    PersonalFastest: boolean
}

export type ISpeed = {
    Value: string,
    Status: number,
    OverallFastest: boolean,
    PersonalFastest: boolean

}
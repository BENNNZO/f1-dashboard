export type TimingStats = {
    Withheld: boolean
    Lines: Record<string, TimingStatsLine>
    SessionType: string
}

export type TimingStatsLine = {
    Line: number
    RacingNumber: string
    PersonalBestLapTime: PersonalBestLapTime
    BestSectors: BestStat[]
    BestSpeeds: Record<string, BestStat>
}

export type PersonalBestLapTime = {
    Value: string
    Lap: number
    Position: number
}

export type BestStat = {
    Value: string
    Position: number
}

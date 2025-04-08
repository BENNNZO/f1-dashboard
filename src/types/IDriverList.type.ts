export type IDriverList = Record<string, IDriver>

export type IDriver = {
    RacingNumber: string,
    BroadcastName: string,
    FullName: string,
    Tla: string,
    Line: number,
    TeamName: string,
    TeamColour: string,
    FirstName: string,
    LastName: string,
    Reference: string,
    HeadshotUrl: string
}
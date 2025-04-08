export type ITimingAppData = {
    Lines: Record<string, ILine>
}

export type ILine = {
    GridPos: string,
    Line: number,
    RacingNumber: string,
    Stints: IStint[]
}

export type IStint = {
    LapTime: string,
    LapNumber: number,
    LapFlags: number,
    Compound: string,
    New: boolean,
    TyresNotChanged: string,
    TotalLaps: number,
    StartLaps: number
}

// {
//     "RacingNumber": "4",
//     "Line": 2,
//     "GridPos": "2",
//     "Stints": [
//         {
//             "LapTime": "1:32.988",
//             "LapNumber": 19,
//             "LapFlags": 0,
//             "Compound": "MEDIUM",
//             "New": "true",
//             "TyresNotChanged": "0",
//             "TotalLaps": 21,
//             "StartLaps": 0
//         },
//         {
//             "LapFlags": 1,
//             "Compound": "HARD",
//             "New": "true",
//             "TyresNotChanged": "0",
//             "TotalLaps": 32,
//             "StartLaps": 0,
//             "LapTime": "1:31.116",
//             "LapNumber": 51
//         }
//     ]
// }
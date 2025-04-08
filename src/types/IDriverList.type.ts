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

// {
//     "RacingNumber": "1",
//     "BroadcastName": "M VERSTAPPEN",
//     "FullName": "Max VERSTAPPEN",
//     "Tla": "VER",
//     "Line": 1,
//     "TeamName": "Red Bull Racing",
//     "TeamColour": "3671C6",
//     "FirstName": "Max",
//     "LastName": "Verstappen",
//     "Reference": "MAXVER01",
//     "HeadshotUrl": "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png"
// }
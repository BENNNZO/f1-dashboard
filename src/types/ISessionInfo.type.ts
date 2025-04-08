export type ISessionInfo = {
    Meeting: {
        Key: number,
        Name: string,
        OfficialName: string,
        Location: string,
        Number: number,
        Country: {
            Key: number,
            Code: string,
            Name: string
        },
        Circuit: {
            Key: number,
            ShortName: string
        }
    },
    ArchiveStatus: {
        Status: string
    },
    Key: number,
    Type: string,
    Name: string,
    StartDate: string,
    EndDate: string,
    GmtOffset: string,
    Path: string,
    _kf: boolean
}
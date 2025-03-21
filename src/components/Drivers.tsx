interface IDrivers {
    [key: string]: {
        RacingNumber: string;
        BroadcastName: string;
        FullName: string;
        Tla: string;
        Line: number;
        TeamName: string;
        TeamColour: string;
        FirstName: string;
        LastName: string;
        Reference: string;
        HeadshotUrl: string;
    }
}

interface ITimingData {
    [key: string]: {
        GapToLeader: string;
        IntervalToPositionAhead: {
            Value: string;
            Catching: boolean;
        };
        Line: number;
        Position: string;
        ShowPosition: boolean;
        RacingNumber: string;
        Retired: boolean;
        InPit: boolean;
        PitOut: boolean;
        Stopped: boolean;
        Status: number;
        Sectors: Array<{
            Stopped: boolean;
            Value: string;
            Status: number;
            OverallFastest: boolean;
            PersonalFastest: boolean;
            Segments: Array<{
                Status: number;
            }>;
            PreviousValue: string;
        }>;
        Speeds: {
            I1: ISpeed;
            I2: ISpeed;
            FL: ISpeed;
            ST: ISpeed;
        };
        BestLapTime: {
            Value: string;
            Lap: number;
        };
        LastLapTime: {
            Value: string;
            Status: number;
            OverallFastest: boolean;
            PersonalFastest: boolean;
        };
        NumberOfLaps: number;
        NumberOfPitStops: number;
    }
}

interface ITimingStats {
    [key: string]: {
        Line: number;
        RacingNumber: string;
        PersonalBestLapTime: {
            Value: string;
            Lap: number;
            Position: number;
        };
        BestSectors: Array<{
            Value: string;
            Position: number;
        }>;
        BestSpeeds: {
            I1: IBestSpeed;
            I2: IBestSpeed;
            FL: IBestSpeed;
            ST: IBestSpeed;
        };
    }
}

interface IBestSpeed {
    Value: string;
    Position: number;
}

interface ISpeed {
    Value: string;
    Status: number;
    OverallFastest: boolean;
    PersonalFastest: boolean;
}

export default function Drivers({ drivers, timingData, timingStats }: { drivers: IDrivers, timingData: ITimingData, timingStats: ITimingStats }) {
    console.log(drivers)
    console.log(timingData)
    console.log(timingStats)

    

    return (
        <div className="flex flex-row gap-2">
            {/* {Object.values(data)?.map((driver: IDriver) => (
                <p key={driver.FullName} className={`whitespace-nowrap font-semibold font-mono px-3 py-1 rounded-full`} style={{ background: `#${driver.TeamColour}` }}>{driver.Tla}</p>
            ))} */}
        </div>
    )
}
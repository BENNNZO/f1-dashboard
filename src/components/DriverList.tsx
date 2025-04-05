import { useWebSocketStore } from "@/store/webSocketStore"

export default function DriverList() {
    const timingAppData = useWebSocketStore(state => state.timingAppData)
    const driverList = useWebSocketStore(state => state.driverList)
    const timingData = useWebSocketStore(state => state.timingData)

    if (!timingAppData || !driverList || !timingData) return null

    const sortedTimingData = Object.entries(timingData.Lines).sort((a: any, b: any) => a[1].Position - b[1].Position)

    // console.log("\n\n\n\n\n\n timing data")
    // console.log(timingAppData)
    // console.log("driver list")
    // console.log(driverList)
    // console.log("timing data")
    // console.log(timingData)
    // console.log("\n\n\n\n\n\n")

    return (
        <div className="flex flex-col gap-2 w-1/2 p-2">
            {sortedTimingData.map(data => {
                const driverNumber: string = data[0]
                const stats: any = data[1]

                return (
                    <div key={driverNumber} className="flex gap-3 p-1 rounded-lg" style={{ background: `#${driverList[driverNumber].TeamColour}`}}>
                        <div className="flex gap-2 items-center px-2 bg-white rounded-md h-8" style={{ color: `#${driverList[driverNumber].TeamColour}`}}>
                            <p className="font-mono text-2xl font-bold">{stats.Position < 10 ? "0" + stats.Position : stats.Position}</p>
                            <p className="font-mono text-2xl font-bold">{driverList[driverNumber].Tla}</p>
                        </div>
                        <div className="flex flex-col w-16">
                            <p className="font-mono leading-4">{stats.GapToLeader === "" ? "---.---" : stats.GapToLeader}</p>
                            <p className="font-mono leading-4 text-sm text-white/50">{stats.IntervalToPositionAhead.Value === "" ? "---.---" : stats.IntervalToPositionAhead.Value}</p>
                        </div>
                        <div className="flex flex-col w-16">
                            <p className="font-mono leading-4">{stats.BestLapTime.Value === "" ? "-:--.---" : stats.BestLapTime.Value}</p>
                            <p className="font-mono leading-4 text-sm text-white/50">{stats.LastLapTime.Value === "" ? "-:--.---": stats.LastLapTime.Value}</p>
                        </div>
                    </div>
                )
            })}
            {/* <pre>{JSON.stringify(sortedTimingData, null, 4)}</pre> */}
        </div>
    )
}

// {
//     "GapToLeader": "+17.356",
//     "IntervalToPositionAhead": {
//       "Value": "+3.102",
//       "Catching": false
//     },
//     "Line": 6,
//     "Position": "6",
//     "ShowPosition": true,
//     "RacingNumber": "1",
//     "Retired": false,
//     "InPit": false,
//     "PitOut": false,
//     "Stopped": false,
//     "Status": 64,
//     "Sectors": {
//       "0": {
//         "Stopped": false,
//         "Value": "25.812",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false,
//         "Segments": {
//           "0": {
//             "Status": 2048
//           },
//           "1": {
//             "Status": 2048
//           },
//           "2": {
//             "Status": 2049
//           },
//           "3": {
//             "Status": 2048
//           },
//           "4": {
//             "Status": 2048
//           },
//           "5": {
//             "Status": 2048
//           },
//           "6": {
//             "Status": 2049
//           }
//         },
//         "PreviousValue": "25.812"
//       },
//       "1": {
//         "Stopped": false,
//         "Value": "29.205",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false,
//         "Segments": {
//           "0": {
//             "Status": 2048
//           },
//           "1": {
//             "Status": 2048
//           },
//           "2": {
//             "Status": 2048
//           },
//           "3": {
//             "Status": 2048
//           },
//           "4": {
//             "Status": 2048
//           },
//           "5": {
//             "Status": 2048
//           }
//         },
//         "PreviousValue": "29.205"
//       },
//       "2": {
//         "Stopped": false,
//         "Value": "",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false,
//         "Segments": {
//           "0": {
//             "Status": 2049
//           },
//           "1": {
//             "Status": 2048
//           },
//           "2": {
//             "Status": 2048
//           },
//           "3": {
//             "Status": 2048
//           },
//           "4": {
//             "Status": 2048
//           },
//           "5": {
//             "Status": 0
//           },
//           "6": {
//             "Status": 0
//           },
//           "7": {
//             "Status": 0
//           },
//           "8": {
//             "Status": 0
//           }
//         },
//         "PreviousValue": "41.737"
//       }
//     },
//     "Speeds": {
//       "I1": {
//         "Value": "280",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false
//       },
//       "I2": {
//         "Value": "272",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false
//       },
//       "FL": {
//         "Value": "",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false
//       },
//       "ST": {
//         "Value": "313",
//         "Status": 0,
//         "OverallFastest": false,
//         "PersonalFastest": false
//       }
//     },
//     "BestLapTime": {
//       "Value": "1:36.922",
//       "Lap": 34
//     },
//     "LastLapTime": {
//       "Value": "1:36.922",
//       "Status": 0,
//       "OverallFastest": false,
//       "PersonalFastest": true
//     },
//     "NumberOfLaps": 34,
//     "NumberOfPitStops": 1
//   }
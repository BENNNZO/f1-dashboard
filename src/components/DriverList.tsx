import { useWebSocketStore } from "@/store/webSocketStore"
import Image from "next/image"

const STATUS_COLORS = {
    "0": "#ffffff40",    // grey
    "2048": "#fcf41b", // yellow
    "2049": "#67ea67", // green
    "2051": "#9567ea"  // purple
}

interface ISector {
    Stopped: boolean,
    Value: string,
    Status: number,
    OverallFastest: boolean,
    PersonalFastest: boolean,
    Segments: Record<string, ISegment>,
    PreviousValue: string
}

interface ISegment {
    Status: number
}

export default function DriverList() {
    const timingAppData = useWebSocketStore(state => state.timingAppData)
    const driverList = useWebSocketStore(state => state.driverList)
    const timingData = useWebSocketStore(state => state.timingData)

    if (!timingAppData || !driverList || !timingData) return null

    const sortedTimingData = Object.entries(timingData.Lines).sort((a: any, b: any) => a[1].Position - b[1].Position)


    return (
        <div className="flex flex-col border-r border-white/20">
            {sortedTimingData.map(data => {
                const driverNumber: string = data[0]
                const stats: any = data[1]

                return (
                    <div key={driverNumber} className="flex gap-3 border-b border-white/20 p-2" style={{ background: `#${driverList[driverNumber].TeamColour}00` }}>
                        <div className="flex gap-2 items-center px-2 rounded-md h-8" style={{ background: `#${driverList[driverNumber].TeamColour}ff` }}>
                            <p className="text-2xl font-bold">{stats.Position < 10 ? "0" + stats.Position : stats.Position}</p>
                            <p className="text-2xl font-bold">{driverList[driverNumber].Tla}</p>
                        </div>
                        <Image className="outline-2 outline-white/20 rounded-full" src={`icons/tires/${timingAppData.Lines[driverNumber].Stints[0].Compound.toLowerCase()}.svg`} width={32} height={32} alt="tire-picture" />
                        <div className="flex flex-col w-24">
                            <p className="font-semibold leading-none">{stats.GapToLeader === "" ? "---.---" : stats.GapToLeader}</p>
                            <p className="font-semibold leading-none text-sm text-white/50">{stats.IntervalToPositionAhead.Value === "" ? "---.---" : stats.IntervalToPositionAhead.Value}</p>
                        </div>
                        <div className="flex flex-col w-26">
                            <p className="font-semibold leading-none">{stats.LastLapTime.Value === "" ? "-:--.---" : stats.LastLapTime.Value}</p>
                            <p className="font-semibold leading-none text-sm text-white/50">{stats.BestLapTime.Value === "" ? "-:--.---" : stats.BestLapTime.Value}</p>
                        </div>
                        <div className="flex gap-2">
                            {Object.entries(stats.Sectors as Record<string, ISector>).map(([sectorNumber, sector]) => (
                                <div key={sectorNumber} className="flex gap-0.5">
                                    {Object.entries(sector.Segments as Record<string, ISegment>).map(([segmentNumber, segment]) => (
                                        <div key={segmentNumber} style={{ background: `${STATUS_COLORS[String(segment.Status) as keyof typeof STATUS_COLORS]}` }} className="w-4 h-2 rounded-full duration-150"></div>
                                    ))}
                                </div>
                            ))}
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
"use client"

import { useEffect } from "react"

import Circuit from "@/components/Circuit"
import ControlMessages from "@/components/ControlMessages"
import DriverList from "@/components/Drivers/DriverList"
import StatusBar from "@/components/StatusBar"
import TeamRadio from "@/components/TeamRadio"
import { useWebSocketStore } from "@/store/webSocketStore"
import decodeZippedBase64 from "@/utils/decodeZipClient"

export default function Home() {
    const updateCarData = useWebSocketStore((state) => state.updateCarData)
    const updatePositionData = useWebSocketStore((state) => state.updatePositionData)
    const updateTimingAppData = useWebSocketStore((state) => state.updateTimingAppData)
    const updateWeatherData = useWebSocketStore((state) => state.updateWeatherData)
    const updateTrackStatus = useWebSocketStore((state) => state.updateTrackStatus)
    const updateDriverList = useWebSocketStore((state) => state.updateDriverList)
    const updateRaceControlMessages = useWebSocketStore((state) => state.updateRaceControlMessages)
    const updateSessionInfo = useWebSocketStore((state) => state.updateSessionInfo)
    const updateLapCount = useWebSocketStore((state) => state.updateLapCount)
    const updateTimingData = useWebSocketStore((state) => state.updateTimingData)
    const updateTeamRadio = useWebSocketStore((state) => state.updateTeamRadio)

    useEffect(() => {
        async function updateData(type: string, data: unknown) {
            switch (type) {
                case "CarData.z":
                    updateCarData(JSON.parse(await decodeZippedBase64(data as string)))
                    break
                case "Position.z":
                    updatePositionData(JSON.parse(await decodeZippedBase64(data as string)))
                    break
                case "TimingAppData":
                    updateTimingAppData(data as Record<string, unknown>)
                    break
                case "WeatherData":
                    updateWeatherData(data as Record<string, unknown>)
                    break
                case "TrackStatus":
                    updateTrackStatus(data as Record<string, unknown>)
                    break
                case "DriverList":
                    updateDriverList(data as Record<string, unknown>)
                    break
                case "RaceControlMessages":
                    updateRaceControlMessages(data as Record<string, unknown>)
                    break
                case "SessionInfo":
                    updateSessionInfo(data as Record<string, unknown>)
                    break
                case "LapCount":
                    updateLapCount(data as Record<string, unknown>)
                    break
                case "TimingData":
                    updateTimingData(data as Record<string, unknown>)
                    break
                case "TeamRadio":
                    updateTeamRadio(data as Record<string, unknown>)
                    break
                default:
                    break
                // console.log(`Unused type found: ${type}`)
            }
        }

        const ws: WebSocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001")

        ws.onmessage = async (message) => {
            const { type, data }: { type: string; data: Record<string, unknown> } = JSON.parse(message.data)

            if (type === "init") {
                Object.keys(data).forEach((key) => {
                    void updateData(key, data[key])
                })
            } else {
                void updateData(type, data)
            }
        }

        return () => ws.close()
    }, [
        updateCarData,
        updatePositionData,
        updateTimingAppData,
        updateWeatherData,
        updateTrackStatus,
        updateDriverList,
        updateRaceControlMessages,
        updateSessionInfo,
        updateLapCount,
        updateTimingData,
        updateTeamRadio,
    ])

    return (
        <>
            <div className="hidden h-screen max-h-screen md:block">
                <StatusBar />
                <div className="flex h-[calc(100vh-49px)] flex-row border-white/10 border-t">
                    <DriverList />
                    <div className="grid w-full min-w-1/2 grid-rows-[minmax(0,1fr)_minmax(0,2fr)] border-white/10 border-l duration-150 xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-rows-[minmax(0,2fr)_minmax(0,1fr)]">
                        <Circuit />
                        <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
                            <ControlMessages />
                            <TeamRadio />
                        </div>
                    </div>
                </div>
            </div>

            <div className="block md:hidden">
                <StatusBar />
                <Circuit />
                <DriverList />
                <div className="flex flex-col">
                    <div className="h-96">
                        <ControlMessages />
                    </div>
                    <div className="h-96">
                        <TeamRadio />
                    </div>
                </div>
            </div>
        </>
    )
}

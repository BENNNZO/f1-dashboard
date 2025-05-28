"use client"

import { useEffect } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";

import decodeZippedBase64 from "@/utils/decodeZipClient";

import Circuit from "@/components/Circuit";
import StatusBar from "@/components/StatusBar";
import ControlMessages from "@/components/ControlMessages";
import DriverList from "@/components/Drivers/DriverList"
import TeamRadio from "@/components/TeamRadio";

export default function Home() {
	const updateCarData = useWebSocketStore(state => state.updateCarData)
	const updatePositionData = useWebSocketStore(state => state.updatePositionData)
	const updateTimingAppData = useWebSocketStore(state => state.updateTimingAppData)
	const updateWeatherData = useWebSocketStore(state => state.updateWeatherData)
	const updateTrackStatus = useWebSocketStore(state => state.updateTrackStatus)
	const updateDriverList = useWebSocketStore(state => state.updateDriverList)
	const updateRaceControlMessages = useWebSocketStore(state => state.updateRaceControlMessages)
	const updateSessionInfo = useWebSocketStore(state => state.updateSessionInfo)
	const updateLapCount = useWebSocketStore(state => state.updateLapCount)
	const updateTimingData = useWebSocketStore(state => state.updateTimingData)
	const updateTeamRadio = useWebSocketStore(state => state.updateTeamRadio)

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

	useEffect(() => {
		const ws: WebSocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001")

		ws.onmessage = async (message) => {
			const { type, data }: { type: string, data: Record<string, unknown> } = JSON.parse(message.data)

			if (type === "init") {
				Object.keys(data).forEach(key => {
					updateData(key, data[key])
				})
			} else {
				updateData(type, data)
			}
		}

		return () => ws.close()
	}, [updateData])

	return (
		<>
			<div className="hidden md:block h-screen max-h-screen">
				<StatusBar />
				<div className="flex flex-row border-white/10 border-t h-[calc(100vh-49px)]">
					<DriverList />
					<div className="grid grid-rows-[minmax(0,1fr)_minmax(0,2fr)] 2xl:grid-rows-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] border-white/10 border-l w-full min-w-1/2 duration-150">
						<Circuit />
						<div className="grid lg:grid-cols-2 grid-rows-2 lg:grid-rows-none">
							<ControlMessages />
							<TeamRadio />
						</div>
					</div>
				</div>
			</div>

			<div className="md:hidden block">
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
	);
}

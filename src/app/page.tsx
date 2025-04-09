"use client"

import { useEffect } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";

import decodeZippedBase64 from "@/utils/decodeZipClient";

import Circuit from "@/components/Circuit";
import StatusBar from "@/components/StatusBar";
import ControlMessages from "@/components/ControlMessages";
import DriverList from "@/components/DriverList"
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
		<div className="max-h-screen h-screen md:overflow-hidden">
			<StatusBar />
			<div className="flex md:flex-row flex-col h-[calc(100vh-49px)] border-t border-white/10">
				<DriverList />
				<div className="grid duration-150 grid-rows-[minmax(0,1fr)_minmax(0,2fr)] 2xl:grid-rows-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-2 border-l border-white/10">
					<Circuit />
					<div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2">
						<ControlMessages />
						<TeamRadio />
					</div>
				</div>
			</div>
		</div>
	);
}

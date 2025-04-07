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
	const updateTopThree = useWebSocketStore(state => state.updateTopThree)
	const updateTimingStats = useWebSocketStore(state => state.updateTimingStats)
	const updateTimingAppData = useWebSocketStore(state => state.updateTimingAppData)
	const updateWeatherData = useWebSocketStore(state => state.updateWeatherData)
	const updateTrackStatus = useWebSocketStore(state => state.updateTrackStatus)
	const updateDriverList = useWebSocketStore(state => state.updateDriverList)
	const updateRaceControlMessages = useWebSocketStore(state => state.updateRaceControlMessages)
	const updateSessionInfo = useWebSocketStore(state => state.updateSessionInfo)
	const updateSessionData = useWebSocketStore(state => state.updateSessionData)
	const updateLapCount = useWebSocketStore(state => state.updateLapCount)
	const updateTimingData = useWebSocketStore(state => state.updateTimingData)
	const updateTeamRadio = useWebSocketStore(state => state.updateTeamRadio)

	async function updateData(type, data) {
		const newTypes = ["TeamRadio", "PitLaneTimeCollection", "ChampionshipPrediction"]

		if (newTypes.includes(type)) {
			console.log(type)
			console.log(data)
		}


		switch (type) {
			case "CarData.z":
				updateCarData(JSON.parse(await decodeZippedBase64(data)))
				break
			case "Position.z":
				updatePositionData(JSON.parse(await decodeZippedBase64(data)))
				break
			case "TopThree":
				updateTopThree(data)
				break
			case "TimingStats":
				updateTimingStats(data)
				break
			case "TimingAppData":
				updateTimingAppData(data)
				break
			case "WeatherData":
				updateWeatherData(data)
				break
			case "TrackStatus":
				updateTrackStatus(data)
				break
			case "DriverList":
				updateDriverList(data)
				break
			case "RaceControlMessages":
				updateRaceControlMessages(data)
				break
			case "SessionInfo":
				updateSessionInfo(data)
				break
			case "SessionData":
				updateSessionData(data)
				break
			case "LapCount":
				updateLapCount(data)
				break
			case "TimingData":
				updateTimingData(data)
				break
			case "TeamRadio":
				updateTeamRadio(data)
				break
			default:
				console.log(`Unused type found: ${type}`)
		}
	}

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3001")

		ws.onmessage = async (message) => {
			const { type, data } = JSON.parse(message.data)

			if (type === "init") {
				Object.keys(data).forEach(key => {
					updateData(key, data[key])
				})
			} else {
				updateData(type, data)
			}
		}

		return () => ws.close()
	}, [])

	return (
		<div className="max-h-screen overflow-hidden">
			<StatusBar />
			<div className="flex h-full">
				<DriverList />
				<div className="grid grid-rows-2 gap-2 h-[calc(100vh-49px)]">
					<Circuit />
					<div className="grid grid-cols-2">
						<ControlMessages />
						<TeamRadio />
					</div>
				</div>
			</div>
		</div>
	);
}

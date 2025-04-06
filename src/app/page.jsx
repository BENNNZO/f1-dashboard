"use client"

import { useEffect } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";

import axios from "axios";
import decodeZippedBase64 from "@/utils/decodeZipClient";

import Circuit from "@/components/Circuit";
import StatusBar from "@/components/StatusBar";
import ControlMessages from "@/components/ControlMessages";
import DriverList from "@/components/DriverList"

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
	const updateCircuitData = useWebSocketStore(state => state.updateCircuitData)

	async function updateData(type, data) {
		// console.log(`${type} data received`)

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
			default:
				console.log(`Unused type found: ${type}`)
		}
	}

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3001")

		ws.onmessage = async (message) => {
			const { type, data } = JSON.parse(message.data)

			if (type === "init") {
				console.log("INIT")
				Object.keys(data).forEach(key => {
					updateData(key, data[key])
				})
			} else {
				updateData(type, data)
			}
		}

		axios.get(`https://api.multiviewer.app/api/v1/circuits/49/${new Date().getFullYear()}`)
 		.then(res => {
			updateCircuitData(res.data)
		})
 		.catch(err => console.log(err))

		return () => ws.close()
	}, [])

	return (
		<div>
			<StatusBar />
			<div className="flex">
				<DriverList />
				<div className="flex flex-col gap-2">
					<Circuit />
					<ControlMessages />
				</div>
			</div>
		</div>
	);
}

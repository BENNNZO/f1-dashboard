"use client"

import { useEffect } from "react";
import { useWebSocketStore } from "@/store/webSocketStore";

import axios from "axios";
import decodeZippedBase64 from "@/utils/decodeZipClient";

import Circuit from "@/components/Circuit";
import LapCount from "@/components/LapCount";

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

		switch (type) {
			case "CarData.z":
				console.log("CarData.z received");
				updateCarData(JSON.parse(await decodeZippedBase64(data)))
				break
			case "Position.z":
				console.log("Position.z received")
				updatePositionData(JSON.parse(await decodeZippedBase64(data)))
				break
			case "TopThree":
				console.log("TopThree received")
				updateTopThree(data)
				break
			case "TimingStats":
				console.log("TimingStats received")
				updateTimingStats(data)
				break
			case "TimingAppData":
				console.log("TimingAppData received")
				updateTimingAppData(data)
				break
			case "WeatherData":
				console.log("WeatherData received")
				updateWeatherData(data)
				break
			case "TrackStatus":
				console.log("TrackStatus received")
				updateTrackStatus(data)
				break
			case "DriverList":
				console.log("DriverList received")
				updateDriverList(data)
				break
			case "RaceControlMessages":
				console.log("RaceControlMessages received")
				updateRaceControlMessages(data)
				break
			case "SessionInfo":
				console.log("SessionInfo received")
				updateSessionInfo(data)
				break
			case "SessionData":
				console.log("SessionData received")
				updateSessionData(data)
				break
			case "LapCount":
				console.log("LapCount received")
				updateLapCount(data)
				break
			case "TimingData":
				console.log("TimingData received")
				updateTimingData(data)
				break
			default:
				console.log(`Unused type: ${type}`)
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
			console.log("got pai data")
			console.log(res.data)
			updateCircuitData(res.data)
		})
 		.catch(err => console.log(err))

		return () => ws.close()
	}, [])

	return (
		<div>
			Hello, World!
			<LapCount />
			<Circuit />
		</div>
	);
}

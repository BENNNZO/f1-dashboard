"use client"

import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3001")

		ws.onmessage = (message) => {
			const { type, data } = JSON.parse(message.data)

			switch (type) {
				case "CarData.z":
					console.log("CarData.z received");
					break;
				case "Position.z":
					console.log("Position.z received");
					break;
				case "TopThree":
					console.log("TopThree received");
					break;
				case "TimingStats":
					console.log("TimingStats received");
					break;
				case "TimingAppData":
					console.log("TimingAppData received");
					break;
				case "WeatherData":
					console.log("WeatherData received");
					break;
				case "TrackStatus":
					console.log("TrackStatus received");
					break;
				case "DriverList":
					console.log("DriverList received");
					break;
				case "RaceControlMessages":
					console.log("RaceControlMessages received");
					break;
				case "SessionInfo":
					console.log("SessionInfo received");
					break;
				case "SessionData":
					console.log("SessionData received");
					break;
				case "LapCount":
					console.log("LapCount received");
					break;
				case "TimingData":
					console.log("TimingData received");
					break;
				default:
					console.log(`Unused type: ${type}`)
			}

		}

		return () => ws.close()
	}, [])

	return (
		<div>
			Hello, World!
		</div>
	);
}

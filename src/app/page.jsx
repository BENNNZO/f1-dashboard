"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import initState from "@/utils/sample_data"

import Weather from "@/components/Weather";
import LapCount from "@/components/LapCount";
import TrackStatus from "@/components/TrackStatus";
import Drivers from "@/components/Drivers";
import Circuit from "@/components/Circuit";

export default function Home() {
	const [data, setData] = useState(undefined)
	const [circuitData, setCircuitData] = useState(null)

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:3001")

		socket.onopen = () => {
			console.log("Connecting To Custom Websocket Server...")
		}

		socket.onerror = err => {
			console.log("Error Connecting To Custom Websocket Server", err)
		}

		socket.onmessage = (message) => {
			console.log(JSON.parse(message.data))
		}

		axios.get(`https://api.multiviewer.app/api/v1/circuits/10/${new Date().getFullYear()}`)
		.then(res => {
			console.log(res.data)
			setCircuitData(res.data)
		})
		.catch(err => console.log(err))

		return () => socket.close()

		// console.log(initState)

		// setTimeout(() => {
		// 	setData(initState)
		// }, 100)

	}, [])

	if (circuitData === null) return <div className="h-screen w-screen grid place-items-center">Loading...</div>

	return (
		<div className="">
			<Circuit circuitData={circuitData} />
			{/* {Object.entries(initState.DriverList).slice(0,-1).map((e) => (
				<div key={e[1].RacingNumber}>{e[1].RacingNumber}</div>
			))} */}


			{/* <div className="flex flex-row justify-between border-b border-b-white/20 p-2">
				<Weather data={initState.WeatherData} fahrenheit={false} />
				<div className="flex flex-row gap-2">
					<LapCount data={initState.LapCount} />
					<TrackStatus data={initState.TrackStatus} />
				</div>
			</div>
			<Drivers data={initState.DriverList} timingData={initState.TimingData.Lines} timingStats={initState.TimingStats.Lines} /> */}
		</div>
	);
}

"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import deepMerge from "@/utils/deepMerge";

import Weather from "@/components/Weather";
import LapCount from "@/components/LapCount";
import TrackStatus from "@/components/TrackStatus";
import Drivers from "@/components/Drivers";
import Circuit from "@/components/Circuit";

export default function Home() {
	const [data, setData] = useState({})
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
			const data = JSON.parse(message.data)

			if (data?.TimingData?.Lines?.["1"]) console.log(data.TimingData.Lines["1"])
			setData(prev => deepMerge(prev, data))
		}

		axios.get(`https://api.multiviewer.app/api/v1/circuits/10/${new Date().getFullYear()}`)
		.then(res => {
			console.log(res.data)
			setCircuitData(res.data)
		})
		.catch(err => console.log(err))

		return () => socket.close()
	}, [])

	if (circuitData === null) return <div className="h-screen w-screen grid place-items-center">Loading...</div>

	return (
		<div className="">
			<Circuit circuitData={circuitData} />
			<pre>{JSON.stringify(data?.TimingData?.Lines?.["1"] || {}, null, 4)}</pre>
		</div>
	);
}

"use client"

import { useEffect, useState } from "react";
import axios from "axios";

import initState from "@/utils/sample_data"
import decodeZippedBase64 from "@/utils/decodeZlib"

import Weather from "@/components/Weather";

export default function Home() {
	const [data, setData] = useState(null)

	useEffect(() => {
		// const socket = new WebSocket("ws://localhost:3001")

		// console.log("Connected To Custom Websocket Server")

		// socket.onmessage = (message) => {
			// console.log((JSON.parse(message.data)))
		// }

		// return () => socket.close()

		console.log(initState)
		// console.log(Object.values(initState.DriverList).slice(0,-1))
		// console.log(Object.entries(JSON.parse(decodeZippedBase64(initState["CarData.z"])).Entries.slice(-1)[0].Cars))
		// console.log(JSON.parse(decodeZippedBase64(initState["Position.z"])))

		setTimeout(() => {
			setData(initState)
		}, 1000)

		axios.get(`https://api.multiviewer.app/api/v1/circuits/${initState.SessionInfo.Meeting.Circuit.Key}/${new Date().getFullYear()}`)
		.then(res => console.log(res.data))
		.catch(err => console.log(err))
	}, [])

	if (data === null) return <div className="h-screen w-screen grid place-items-center">Loading...</div>

	return (
		<div className="">
			<Weather data={initState.WeatherData} fahrenheit={false} />
			{/* {Object.entries(initState.DriverList).slice(0,-1).map((e) => (
				<div key={e[1].RacingNumber}>{e[1].RacingNumber}</div>
			))} */}
		</div>
	);
}

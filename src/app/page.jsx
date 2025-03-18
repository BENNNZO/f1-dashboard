"use client"

import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const socket = new WebSocket("ws://localhost:3001")

		console.log("Connected To Custom Websocket Server")

		socket.onmessage = (message) => {
			console.log((JSON.parse(message.data)))
			console.log(message)
		}

		return () => socket.close()
	}, [])

	return (
		<div className="h-screen bg-black p-2 text-white flex flex-col gap-2">
			Hello, World!
		</div>
	);
}

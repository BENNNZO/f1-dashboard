"use client"

import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3001")

		ws.onmessage = (message) => {
			console.log("ws message")
		}

		return () => ws.close()
	}, [])

	return (
		<div>
			Hello, World!
		</div>
	);
}

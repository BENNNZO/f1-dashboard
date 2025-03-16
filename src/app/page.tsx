"use client"

import { useState, useEffect } from "react"
import axios from "axios";

interface WeatherData {
    meeting_key: number;
    session_key: number;
    date: string;
    air_temperature: number;
    humidity: number;
    pressure: number;
    rainfall: number;
    track_temperature: number;
    wind_direction: number;
    wind_speed: number;
}

export default function Home() {
    const [fahrenheit, setFahrenheit] = useState<boolean>(false)
    const [delay, setDelay] = useState<number>(0)

    const [weather, setWeather] = useState<WeatherData | null>(null)

    useEffect(() => {
		// most recent date **will be used in production**
        let date = new Date(Date.now() - (delay * 1000)).toISOString()

        axios.get(`https://api.openf1.org/v1/weather?session_key=latest&date>=${"2025-03-16T06:00:00.000Z"}`)
        .then(res => setWeather(res.data[0]))
        .catch(err => console.log(err))
    }, [])
	if (!weather) return <div className="w-screen h-screen grid place-items-center text-2xl font-semibold bg-black text-white">loading...</div>

	if (weather) return (
		<div className="h-screen bg-black p-2 text-white">
			<div className="flex flex-row gap-2">
				<button className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono cursor-pointer hover:bg-neutral-800 duration-150 ease-out" onClick={() => setFahrenheit(prev => !prev)}>toggle measurment</button>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `air_temperature:`} {fahrenheit ? (weather.air_temperature * (9 / 5) + 32).toFixed(2) : weather?.air_temperature.toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `humidity:`} {weather?.humidity}%</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `pressure:`} {weather?.pressure}</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `rainfall:`} {weather?.rainfall} mbar</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `track_temperature:`} {fahrenheit ? (weather.track_temperature * (9 / 5) + 32).toFixed(2) : weather?.track_temperature.toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `wind_direction:`} {weather?.wind_direction}°</p>
				<p className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 font-mono">{false && `wind_speed:`} {weather?.wind_speed} m/s</p>
			</div>
		</div>
	);
}

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

interface DriverData {
    broadcast_name: string;
    country_code: string;
    driver_number: number;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    meeting_key: number;
    name_acronym: string;
    session_key: number;
    team_colour: string;
    team_name: string;
}

interface LocationData {
    date: string;
    driver_number: number;
    meeting_key: number;
    session_key: number;
    x: number;
    y: number;
    z: number;
}

export default function Home() {
    const [fahrenheit, setFahrenheit] = useState<boolean>(false)
    const [delay, setDelay] = useState<number>(0)

    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [drivers, setDrivers] = useState<DriverData[] | null>(null)
	const [locations, setLocations] = useState<LocationData[][] | null>(null)

    useEffect(() => {
		// most recent date **will be used in production**
        let date = new Date(Date.now() - (delay * 1000)).toISOString()

        axios.get(`https://api.openf1.org/v1/weather?session_key=latest&date>=${"2025-03-16T06:00:00.000Z"}`)
        .then(res => {
			console.log("Weather Data:")
			setWeather(res.data[0])
		})
        .catch(err => console.log(err))
		
        axios.get(`https://api.openf1.org/v1/drivers?session_key=latest`)
        .then(res => {
			console.log("Driver Data:")
			setDrivers(res.data)
			console.log(res.data)
		})
        .catch(err => console.log(err))
		
        axios.get(`https://api.openf1.org/v1/location?session_key=latest&date>=${"2025-03-16T06:00:00.000Z"}&date<=${"2025-03-16T06:00:01.000Z"}`)
        .then(res => {
			console.log("Location Data:")
			
			let data = []

			for (let i = 0; i < res.data.length; i += 20) {
				const chunk = res.data.slice(i, i + 20)
				data.push(chunk)
			}

			console.log(data)
			setLocations(data)
		})

        .catch(err => console.log(err))
		
        axios.get(`https://api.openf1.org/v1/position?session_key=latest&date>=${"2025-03-16T06:00:00.000Z"}&date<=${"2025-03-16T06:00:02.000Z"}`)
        .then(res => {
			console.log("Position Data:")
			console.log(res.data)
		})
        .catch(err => console.log(err))
    }, [])

	function getRecentLocationData(data: LocationData[]) {
		// console.log("Location Data:")

		// const latestData: LocationData = {} as LocationData;
	
		// data.forEach((entry: LocationData) => {
		// 	const driverNum = entry.driver_number;
		// 	if (!latestData[driverNum] || new Date(entry.date) > new Date(latestData[driverNum].date)) {
		// 		latestData[driverNum] = entry;
		// 	}
		// });
	}

	if (!weather || !drivers) return <div className="w-screen h-screen grid place-items-center text-2xl font-semibold bg-black text-white">loading...</div>

	if (weather && drivers) return (
		<div className="h-screen bg-black p-2 text-white flex flex-col gap-2">
			<div className="flex flex-row gap-2">
				<button className="bg-neutral-800 rounded-full px-3 py-1 font-mono cursor-pointer hover:bg-neutral-800 duration-150 ease-out" onClick={() => setFahrenheit(prev => !prev)}>toggle measurment</button>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `air_temperature:`} {fahrenheit ? (weather.air_temperature * (9 / 5) + 32).toFixed(2) : weather?.air_temperature.toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `humidity:`} {weather?.humidity}%</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `pressure:`} {weather?.pressure}</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `rainfall:`} {weather?.rainfall} mbar</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `track_temperature:`} {fahrenheit ? (weather.track_temperature * (9 / 5) + 32).toFixed(2) : weather?.track_temperature.toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `wind_direction:`} {weather?.wind_direction}°</p>
				<p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `wind_speed:`} {weather?.wind_speed} m/s</p>
			</div>
            <div className="flex flex-row gap-2">
                {drivers?.map((driver: DriverData, i: number) => (
                    <div key={i} className="flex flex-row gap-2">
						{/* <img src={driver.headshot_url} alt="headshot" style={{ background: `#${driver.team_colour}` }} className="rounded-full h-16" /> */}
                        <p className={`whitespace-nowrap font-semibold font-mono px-3 py-1 rounded-full`} style={{ background: `#${driver.team_colour}` }}>{driver.name_acronym}</p>
                    </div>
                ))}
            </div>
			<div className="w-[800px] h-[500px] bg-red-400 relative">
				{locations && locations[0].map((location: LocationData, i: number) => {
					if (location.x === 0 && location.y === 0 && location.z === 0) return

					return (
						<div key={i} className="bg-black w-4 h-4 rounded-full absolute top-1/2 left-1/2" style={{ transform: `translate(calc(-50% - ${location.x / 50}px), calc(-50% - ${location.y / 50}px))`, background: `#${drivers.find(e => e.driver_number === location.driver_number)?.team_colour}` }}>
						</div>
					)
				})}
			</div>
		</div>
	);
}

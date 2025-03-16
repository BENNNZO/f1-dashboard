"use client"

import axios from "axios"
import { useState, useEffect } from "react"

interface IWeather {
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

export default function Weather() {
    const [fahrenheit, setFahrenheit] = useState(false)
    const [weather, setWeather] = useState<IWeather | null>(null)

    useEffect(() => {
        axios.get(`https://api.openf1.org/v1/weather?session_key=latest&date>=${"2025-03-16T06:00:00.000Z"}`)
            .then(res => {
                console.log("Weather Data:")
                setWeather(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    if (weather) return (
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
    )
}
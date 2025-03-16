"use client"

import { useState, useEffect } from "react"
import axios from "axios";

interface ILocation {
    date: string;
    driver_number: number;
    meeting_key: number;
    session_key: number;
    x: number;
    y: number;
    z: number;
}

export default function Map() {
    const [locations, setLocations] = useState<ILocation[][] | null>(null)

    useEffect(() => {
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
    }, [])

    return (
        <div className="w-[800px] h-[500px] bg-red-400 relative">
            {locations && locations[0].map((location: ILocation, i: number) => {
                if (location.x === 0 && location.y === 0 && location.z === 0) return

                return (
                    <div key={i} className="bg-black w-4 h-4 rounded-full absolute top-1/2 left-1/2" style={{ transform: `translate(calc(-50% - ${location.x / 50}px), calc(-50% - ${location.y / 50}px))` }}>
                    </div>
                )
            })}
        </div>
    )
}
"use client"

import { useState, useEffect } from "react"
import axios from "axios"

interface IDriver {
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

export default function Drivers() {
    const [drivers, setDrivers] = useState<IDriver[] | null>(null)

    useEffect(() => {
        axios.get(`https://api.openf1.org/v1/drivers?session_key=latest`)
        .then(res => setDrivers(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="flex flex-row gap-2">
            {drivers?.map((driver: IDriver) => (
                <p key={driver.name_acronym} className={`whitespace-nowrap font-semibold font-mono px-3 py-1 rounded-full`} style={{ background: `#${driver.team_colour}` }}>{driver.name_acronym}</p>
            ))}
        </div>
    )
}
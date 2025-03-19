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

/* ------------------------------------ - ----------------------------------- */
/* ------------------------------------ - ----------------------------------- */
/* ---------- IM ONLY KEEPING THIS CAUSE I SPENT SO LONG ON IT LOL ---------- */
/* ------------------------------------ - ----------------------------------- */
/* ------------------------------------ - ----------------------------------- */

export default function Map2() {
    /* -------------------------------- VARIABLES ------------------------------- */
    const [locationSets, setLocationSets] = useState<ILocation[][]>([])
    const [currentLocationSet, setCurrentLocationSet] = useState<ILocation[] | null>(null)
    const [deltaTime, setDeltaTime] = useState<number>(0)
    
    const startTime = Date.now()
    const fakeTime = new Date("2025-03-16T05:00:00.000Z").getTime()
    const backTrack = 20 * 1000
    const updateInterval = 250

    /* -------------------------------- FUNCTIONS ------------------------------- */
    function chunkArray(array: ILocation[], chunkSize: number) {
        const chunkedArray = []

        for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize))
        }

        return chunkedArray
    }

    function updateLocationSets() {
        const frontTime = fakeTime + deltaTime // Todo: change to Date.now() when in production
        const backTime = frontTime - backTrack

        axios.get(`https://api.openf1.org/v1/location?session_key=latest&date>=${new Date(backTime).toISOString()}&date<=${new Date(frontTime).toISOString()}`)
            .then(res => setLocationSets(chunkArray(res.data, 20)))
            .catch(err => console.log(err))
    }

    function updateDeltaTime(startTime: number) {
        setDeltaTime(Math.abs(startTime - Date.now()))
    }

    function findRecentLocationSet(sets: ILocation[][], time: number) {
        let closestSet = null
        let smallestTimeDiff = Infinity

        sets.forEach((set: ILocation[]) => {
            const setDate = new Date(set[0].date).getTime()
            const setDiff = Math.abs(setDate - time)

            if (setDiff < smallestTimeDiff) {
                smallestTimeDiff = setDiff
                closestSet = set
            }
        })

        return closestSet
    }

    /* ------------------------------- USE EFFECT ------------------------------- */
    // init api call and setup deltaTime interval
    useEffect(() => {
        updateLocationSets()

        const updateDelta = setInterval(() => updateDeltaTime(startTime), updateInterval)

        return () => clearInterval(updateDelta)
    }, [])

    // update location arrays every 10 seconds
    useEffect(() => {
        const updateInterval = setInterval(() => updateLocationSets(), backTrack / 2)

        return () => clearInterval(updateInterval)
    }, [locationSets])

    // set current locations every time delta time is updated
    useEffect(() => {
        setCurrentLocationSet(findRecentLocationSet(locationSets, new Date(fakeTime + deltaTime - backTrack - 5000).getTime()))
    }, [locationSets, deltaTime])


    /* --------------------------------- RETURN --------------------------------- */
    return (
        <div>
            <p>{new Date(deltaTime).getSeconds()}</p>
            <pre>{currentLocationSet ? JSON.stringify(currentLocationSet[0], null, 4) : "NO DATA"}</pre>
            <div className="w-[800px] h-[500px] bg-neutral-900 relative">
                {currentLocationSet && currentLocationSet.map((location: ILocation) => {
                    if (location.x === 0 && location.y === 0 && location.z === 0) return

                    return (
                        <div key={location.driver_number} className="bg-black w-4 h-4 rounded-full absolute top-1/2 left-1/2 duration-1000 ease-linear" style={{ transform: `translate(calc(-50% - ${location.x / 50}px), calc(-50% - ${location.y / 50}px))` }}></div>
                    )
                })}
            </div>
        </div>
    )
}

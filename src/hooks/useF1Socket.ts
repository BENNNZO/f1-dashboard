import { useState, useEffect } from 'react'
import axios from 'axios'

const CLIENT_PROTOCOL = 1.5
const CONNECTION_DATA = encodeURIComponent(JSON.stringify([{ name: "Streaming" }]))
const URL = "https://livetiming.formula1.com/signalr"

export function useF1Socket() {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    async function negotiation() {
        try {
            const res = await axios.get(`${URL}/negotiate?clientProtocol=${CLIENT_PROTOCOL}&connectionData=${CONNECTION_DATA}`)
            return {
                encodedToken: encodeURIComponent(res.data["ConnectionToken"]),
                cookie: res.headers["set-cookie"]
            }
        } catch (err) {
            setError("Failed to negotiate connection")
            return null
        }
    }

    async function connect() {
        const negotiationData = await negotiation()
        if (!negotiationData) return

        const { encodedToken, cookie } = negotiationData
        const headers = { 'User-Agent': 'BestHTTP', 'Accept-Encoding': 'gzip,identity', 'Cookie': cookie }
        const socketURL = `${URL}/connect?transport=webSockets&clientProtocol=${CLIENT_PROTOCOL}&connectionToken=${encodedToken}&connectionData=${CONNECTION_DATA}`

        const ws = new WebSocket(socketURL)

        ws.onopen = () => {
            const message = JSON.stringify({
                "H": "Streaming",
                "M": "Subscribe",
                "A": [["Heartbeat", "CarData.z", "Position.z", "ExtrapolatedClock", "TopThree", "RcmSeries", "TimingStats", "TimingAppData", "WeatherData", "TrackStatus", "DriverList", "RaceControlMessages","SessionInfo", "SessionData", "LapCount", "TimingData"]],
                "I": 1
            })
            ws.send(message)
            setSocket(ws)
        }

        ws.onmessage = (event) => {
            try {
                setData(JSON.parse(event.data))
            } catch (err) {
                setData(event.data)
            }
        }

        ws.onerror = () => {
            setError("WebSocket connection error")
        }

        ws.onclose = () => {
            setSocket(null)
        }
    }

    useEffect(() => {
        connect()

        return () => {
            if (socket) {
                socket.close()
            }
        }
    }, [])

    return { data, error, isConnected: !!socket }
}
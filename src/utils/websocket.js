import axios from "axios"
import WebSocket from "ws"

const CLIENT_PROTOCOL = 1.5
const CONNECTION_DATA = encodeURIComponent(JSON.stringify([{ name: "Streaming" }]))
const URL = "https://livetiming.formula1.com/signalr"

function logError(error, message) {
    console.log(` >> Error: ${message}`)
    console.log(` >> ${error}`)
}

async function negotiation() {
    try {
        const res = await axios.get(`${URL}/negotiate?clientProtocol=${CLIENT_PROTOCOL}&connectionData=${CONNECTION_DATA}`)

        let data = res.data
        let headers = res.headers

        // console.log({ encodedToken: encodeURIComponent(data["ConnectionToken"]), cookie: headers["set-cookie"] })

        return { encodedToken: encodeURIComponent(data["ConnectionToken"]), cookie: headers["set-cookie"] }
    } catch (err) {
        logError(err, "Failed to negotiate")
    }
}

async function connectWSS(encodedToken, cookie) {
    try {
        const headers = {
            'User-Agent': 'BestHTTP',
            'Accept-Encoding': 'gzip,identity',
            'Cookie': cookie
        }

        const p = new Promise((res, rej) => {
            const socketURL = `${URL}/connect?transport=webSockets&clientProtocol=${CLIENT_PROTOCOL}&connectionToken=${encodedToken}&connectionData=${CONNECTION_DATA}`

            const socket = new WebSocket(socketURL, { headers })

            socket.on("open", () => {
                console.log("[WekSocket] -- Connected")

                // H: The hub to invoke the method on
                // M: The method to invoke
                // A: The arguments to pass to the method
                // I: Client side id for the request/response

                // ARGUMENTS: "Heartbeat", "CarData.z", "Position.z", "ExtrapolatedClock", 
                //            "TopThree", "RcmSeries", "TimingStats", "TimingAppData", 
                //            "WeatherData", "TrackStatus", "DriverList", "RaceControlMessages",
                //            "SessionInfo", "SessionData", "LapCount", "TimingData"

                const message = JSON.stringify({
                    "H": "Streaming",
                    "M": "Subscribe",
                    "A": [["Heartbeat", "LapCount"]],
                    "I": 1
                })

                socket.send(message)

                res(socket)
            })

            socket.on("message", message => {
                console.log(`[WebSocket] >> ${message}`)
            })

            socket.on("error", e => {
                console.log("[WebSocket] -- Error")
                
                rej(e)
            })
        })

        return p
    } catch (err) {
        logError(err, "Failed to connect to websocket")
    }
}

async function main() {
    const { encodedToken, cookie } = await negotiation()
    const socket = await connectWSS(encodedToken, cookie)

    return socket
}

main()
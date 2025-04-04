import { useWebSocketStore } from "@/store/webSocketStore"

interface IWeather {
    AirTemp: string;
    Humidity: string;
    Pressure: string;
    Rainfall: string;
    TrackTemp: string;
    WindDirection: string;
    WindSpeed: string;
}

export default function Weather() {
    const weatherData: IWeather = useWebSocketStore(state => state.weatherData)

    console.log(weatherData)

    return (
        <div>
            <p>{weatherData.AirTemp}deg</p>
        </div>
    )
}
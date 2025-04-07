import { useWebSocketStore } from "@/store/webSocketStore"
import { CtoF } from "@/utils/convertTemp";

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

    if (weatherData) return (
        <div className="flex gap-2">
            <p className="bg-zinc-900 px-4 rounded-full py-1 h-8">{CtoF(Number(weatherData.AirTemp)).toFixed(1)}° F</p>
            <p className="bg-zinc-900 px-4 rounded-full py-1 h-8">{CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F</p>
            <p className="bg-zinc-900 px-4 rounded-full py-1 h-8">{weatherData.Humidity}%</p>
        </div>
    )
}
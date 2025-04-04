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

    console.log(weatherData)

    return (
        <div className="flex gap-2">
            <p className="font-mono bg-zinc-900 px-4 py-1 rounded-full">{CtoF(Number(weatherData.AirTemp)).toFixed(1)}° F</p>
            <p className="font-mono bg-zinc-900 px-4 py-1 rounded-full">{CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F</p>
            <p className="font-mono bg-zinc-900 px-4 py-1 rounded-full">{weatherData.Humidity}%</p>
        </div>
    )
}
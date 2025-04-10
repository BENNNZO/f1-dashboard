import { useWebSocketStore } from "@/store/webSocketStore"
import { CtoF } from "@/utils/convertTemp";
import Skeleton from "./Skeleton";

import { IWeatherData } from "@/types/IWeatherData.type";


export default function Weather() {
    const weatherData: IWeatherData | null = useWebSocketStore(state => state.weatherData)

    if (weatherData) {
        return (
            <div className="flex gap-2">
                <p className="bg-zinc-900 border border-white/5 px-4 rounded-full py-1 h-8">{CtoF(Number(weatherData.AirTemp)).toFixed(1)}° F</p>
                <p className="bg-zinc-900 border border-white/5 px-4 rounded-full py-1 h-8">{CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F</p>
                <p className="bg-zinc-900 border border-white/5 px-4 rounded-full py-1 h-8">{weatherData.Humidity}%</p>
            </div>
        )
    } else {
        return (
            <div className="flex gap-2">
                <Skeleton delay={null} width={101} height={32} rounded />
                <Skeleton delay={null} width={101} height={32} rounded />
                <Skeleton delay={null} width={82} height={32} rounded />
            </div>
        )
    } 
}
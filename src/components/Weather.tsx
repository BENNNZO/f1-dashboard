import { useWebSocketStore } from "@/store/webSocketStore"
import type { WeatherData } from "@/types/WeatherData.type"
import { CtoF } from "@/utils/convertTemp"

import Skeleton from "./Skeleton"

export default function Weather() {
    const weatherData: WeatherData | null = useWebSocketStore((state) => state.weatherData)

    if (weatherData) {
        return (
            <div className="flex gap-2">
                <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">
                    {CtoF(Number(weatherData.AirTemp)).toFixed(1)}° F
                </p>

                <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">
                    {CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F
                </p>

                <p className="h-8 rounded-full border border-white/5 bg-zinc-900 px-4 py-1">{weatherData.Humidity}%</p>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            <Skeleton
                width={101}
                height={32}
                rounded
            />

            <Skeleton
                width={101}
                height={32}
                rounded
            />

            <Skeleton
                width={82}
                height={32}
                rounded
            />
        </div>
    )
}

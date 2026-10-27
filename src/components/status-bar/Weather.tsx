import { useWebSocketStore } from "@/store/webSocketStore"
import { CtoF } from "@/utils/convertTemp"

export default function Weather() {
    const weatherData = useWebSocketStore((state) => state.data.WeatherData)

    if (weatherData) {
        return (
            <div className="flex flex-row gap-10 px-6">
                <p>
                    <strong className="text-sm opacity-50">Air:</strong> {CtoF(Number(weatherData.AirTemp)).toFixed(1)}°
                    F
                </p>
                <p>
                    <strong className="text-sm opacity-50">Track:</strong>{" "}
                    {CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F
                </p>
                <p>
                    <strong className="text-sm opacity-50">Humidity:</strong> {weatherData.Humidity}%
                </p>
            </div>
        )
    }
}

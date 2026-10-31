import { useWebSocketStore } from "@/store/webSocketStore"
import { CtoF } from "@/utils/convertTemp"

export default function Weather() {
    const weatherData = useWebSocketStore((state) => state.data.WeatherData)

    if (weatherData) {
        const readings = [
            { label: "Air", value: `${CtoF(Number(weatherData.AirTemp)).toFixed(1)}° F` },
            { label: "Track", value: `${CtoF(Number(weatherData.TrackTemp)).toFixed(1)}° F` },
            { label: "Humidity", value: `${weatherData.Humidity}%` },
        ]

        return (
            <div className="flex flex-row gap-6">
                {readings.map(({ label, value }) => (
                    <p key={label}>
                        <strong className="text-sm text-subtle">{label}: </strong>
                        {value}
                    </p>
                ))}
            </div>
        )
    }
}

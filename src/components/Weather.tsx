interface IWeather {
    AirTemp: string;
    Humidity: string;
    Pressure: string;
    Rainfall: string;
    TrackTemp: string;
    WindDirection: string;
    WindSpeed: string;
}

export default function Weather({ data, fahrenheit }: { data: IWeather, fahrenheit: boolean }) {
    return (
        <div className="flex flex-row gap-2">
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `air_temperature:`} {fahrenheit ? (Number(data.AirTemp) * (9 / 5) + 32).toFixed(2) : Number(data.AirTemp).toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `humidity:`} {data?.Humidity}%</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `pressure:`} {data?.Pressure}</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `rainfall:`} {data?.Rainfall} mbar</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `track_temperature:`} {fahrenheit ? (Number(data.TrackTemp) * (9 / 5) + 32).toFixed(2) : Number(data.TrackTemp).toFixed(2)}°{fahrenheit ? "F" : "C"}</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `wind_direction:`} {data?.WindDirection}°</p>
            <p className="bg-neutral-800 rounded-full px-3 py-1 font-mono">{false && `wind_speed:`} {data?.WindSpeed} m/s</p>
        </div>
    )
}
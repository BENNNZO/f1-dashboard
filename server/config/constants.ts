export const F1_CONSTANTS = {
    CLIENT_PROTOCOL: 1.5,
    CONNECTION_DATA: encodeURIComponent(JSON.stringify([{ name: "Streaming" }])),
    BASE_URL: "livetiming.formula1.com/signalr",
    SUBSCRIPTION_TOPICS: [
        "Heartbeat",
        "CarData.z",
        "Position.z",
        "ExtrapolatedClock",
        "TopThree",
        "RcmSeries",
        "TimingStats",
        "TimingAppData",
        "WeatherData",
        "TrackStatus",
        "DriverList",
        "RaceControlMessages",
        "SessionInfo",
        "SessionData",
        "LapCount",
        "TimingData"
    ]
}

export const SERVER_CONSTANTS = {
    PORT: 3001
}
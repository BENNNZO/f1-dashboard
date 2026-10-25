export const F1_CONSTANTS = {
    BASE_URL: "livetiming.formula1.com/signalrcore",
    PING_INTERVAL: 15000,
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
        "TimingData",
        "TeamRadio",
        "PitLaneTimeCollection",
        "ChampionshipPrediction",
    ],
}

export const SERVER_CONSTANTS = {
    PORT: 3001,
}

export const F1_CONSTANTS = {
    BASE_URL: "livetiming.formula1.com/signalrcore",
    PING_INTERVAL: 15000,
    SUBSCRIPTION_TOPICS: [
        // Needs an F1 TV token: "CarData.z", "Position.z",
        "Heartbeat",
        "ExtrapolatedClock",
        "TopThree",
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
        "CurrentTyres",
        "TyreStintSeries",
        "LapSeries",
        "TimingDataF1",
        "DriverTracker",
        "TlaRcm",
    ],
}

export const SERVER_CONSTANTS = {
    PORT: 3001,
}

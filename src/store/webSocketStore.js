import { create } from "zustand";
import deepMerge from "../utils/deepMerge"

export const useWebSocketStore = create(set => ({
    carData: null,
    positionData: null,
    topThree: null,
    timingStats: null,
    timingAppData: null,
    weatherData: null,
    trackStatus: null,
    driverList: null,
    raceControlMessages: null,
    sessionInfo: null,
    sessionData: null,
    lapCount: null,
    timingData: null,
    circuitData: null,
    updateCarData: (newData) => set(() => ({ carData: newData })),
    updatePositionData: (newData) => set(() => ({ positionData: newData.Position })),
    updateTopThree: (newData) => set(state => ({ topThree: deepMerge(state.topThree, newData) })),
    updateTimingStats: (newData) => set(state => ({ timingStats: deepMerge(state.timingStats, newData) })),
    updateTimingAppData: (newData) => set(state => ({ timingAppData: deepMerge(state.timingAppData, newData) })),
    updateWeatherData: (newData) => set(state => ({ weatherData: deepMerge(state.weatherData, newData) })),
    updateTrackStatus: (newData) => set(state => ({ trackStatus: deepMerge(state.trackStatus, newData) })),
    updateDriverList: (newData) => set(state => ({ driverList: deepMerge(state.driverList, newData) })),
    updateRaceControlMessages: (newData) => set(state => ({ raceControlMessages: deepMerge(state.raceControlMessages, newData) })),
    updateSessionInfo: (newData) => set(state => ({ sessionInfo: deepMerge(state.sessionInfo, newData) })),
    updateSessionData: (newData) => set(state => ({ sessionData: deepMerge(state.sessionData, newData) })),
    updateLapCount: (newData) => set(state => ({ lapCount: deepMerge(state.lapCount, newData) })),
    updateTimingData: (newData) => set(state => ({ timingData: deepMerge(state.timingData, newData) })),
    updateCircuitData: (newData) => set(() => ({ circuitData: newData }))
}))
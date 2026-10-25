import { create } from "zustand"

import type { CircuitData } from "@/types/CircuitData.type"
import type { DriverListData } from "@/types/DriverListData.type"
import type { LapCountData } from "@/types/LapCountData.type"
import type { PositionData } from "@/types/PositionData.type"
import type { RaceControlMessages } from "@/types/RaceControlMessages.type"
import type { SessionInfo } from "@/types/SessionInfo.type"
import type { TeamRadioData } from "@/types/TeamRadioData.type"
import type { TimingAppData } from "@/types/TimingAppData.type"
import type { TimingData } from "@/types/TimingData.type"
import type { TrackStatusData } from "@/types/TrackStatusData.type"
import type { WeatherData } from "@/types/WeatherData.type"
import deepMerge from "@/utils/deepMerge"

type StoreState = {
    carData: string | null
    positionData: PositionData | null
    circuitData: CircuitData | null
    timingAppData: TimingAppData | null
    weatherData: WeatherData | null
    trackStatus: TrackStatusData | null
    driverList: DriverListData | null
    raceControlMessages: RaceControlMessages | null
    sessionInfo: SessionInfo | null
    lapCount: LapCountData | null
    timingData: TimingData | null
    teamRadio: TeamRadioData | null
    updateCarData: (newData: string) => void
    updatePositionData: (newData: { Position: PositionData }) => void
    updateCircuitData: (newData: CircuitData) => void
    updateTimingAppData: (newData: Record<string, unknown>) => void
    updateWeatherData: (newData: Record<string, unknown>) => void
    updateTrackStatus: (newData: Record<string, unknown>) => void
    updateDriverList: (newData: Record<string, unknown>) => void
    updateRaceControlMessages: (newData: Record<string, unknown>) => void
    updateSessionInfo: (newData: Record<string, unknown>) => void
    updateLapCount: (newData: Record<string, unknown>) => void
    updateTimingData: (newData: Record<string, unknown>) => void
    updateTeamRadio: (newData: Record<string, unknown>) => void
}

export const useWebSocketStore = create<StoreState>((set) => ({
    carData: null,
    positionData: null,
    circuitData: null,
    timingAppData: null,
    weatherData: null,
    trackStatus: null,
    driverList: null,
    raceControlMessages: null,
    sessionInfo: null,
    lapCount: null,
    timingData: null,
    teamRadio: null,
    updateCarData: (newData) => set(() => ({ carData: newData })),
    updatePositionData: (newData) => set(() => ({ positionData: newData.Position })),
    updateCircuitData: (newData) => set(() => ({ circuitData: newData })),
    updateTimingAppData: (newData) =>
        set((state) => ({ timingAppData: deepMerge(state.timingAppData, newData) as TimingAppData })),
    updateWeatherData: (newData) =>
        set((state) => ({ weatherData: deepMerge(state.weatherData, newData) as WeatherData })),
    updateTrackStatus: (newData) =>
        set((state) => ({ trackStatus: deepMerge(state.trackStatus, newData) as TrackStatusData })),
    updateDriverList: (newData) =>
        set((state) => ({ driverList: deepMerge(state.driverList, newData) as DriverListData })),
    updateRaceControlMessages: (newData) =>
        set((state) => ({
            raceControlMessages: deepMerge(state.raceControlMessages, newData) as RaceControlMessages,
        })),
    updateSessionInfo: (newData) =>
        set((state) => ({ sessionInfo: deepMerge(state.sessionInfo, newData) as SessionInfo })),
    updateLapCount: (newData) => set((state) => ({ lapCount: deepMerge(state.lapCount, newData) as LapCountData })),
    updateTimingData: (newData) => set((state) => ({ timingData: deepMerge(state.timingData, newData) as TimingData })),
    updateTeamRadio: (newData) => set((state) => ({ teamRadio: deepMerge(state.teamRadio, newData) as TeamRadioData })),
}))

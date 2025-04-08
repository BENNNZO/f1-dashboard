import { create } from "zustand";
import deepMerge from "../utils/deepMerge"

import { IPositionData } from "@/types/IPositionData.type";
import { ICircuitData } from "@/types/ICircuitData.type";
import { ITimingAppData } from "@/types/ITimingAppData.type";
import { IWeatherData } from "@/types/IWeatherData.type";
import { ITrackStatus } from "@/types/ITrackStatus.type";
import { IDriverList } from "@/types/IDriverList.type";
import { IRaceControlMessages } from "@/types/IRaceControlMessages.type";
import { ISessionInfo } from "@/types/ISessionInfo.type";
import { ILapCount } from "@/types/ILapCount.type";
import { ITimingData } from "@/types/ITimingData.type";
import { ITeamRadio } from "@/types/ITeamRadio.type";

interface IStoreState {
    carData: string | null,
    positionData: IPositionData | null,
    circuitData: ICircuitData | null,
    topThree: any | null,
    timingStats: any | null,
    timingAppData: ITimingAppData | null
    weatherData: IWeatherData | null,
    trackStatus: ITrackStatus | null,
    driverList: IDriverList | null,
    raceControlMessages: IRaceControlMessages | null,
    sessionInfo: ISessionInfo | null,
    sessionData: any | null,
    lapCount: ILapCount | null,
    timingData: ITimingData | null,
    teamRadio: ITeamRadio | null,
    updateCarData: (newData: any) => void,
    updatePositionData: (newData: any) => void,
    updateCircuitData: (newData: any) => void,
    updateTopThree: (newData: any) => void,
    updateTimingStats: (newData: any) => void,
    updateTimingAppData: (newData: any) => void,
    updateWeatherData: (newData: any) => void,
    updateTrackStatus: (newData: any) => void,
    updateDriverList: (newData: any) => void,
    updateRaceControlMessages: (newData: any) => void,
    updateSessionInfo: (newData: any) => void,
    updateSessionData: (newData: any) => void,
    updateLapCount: (newData: any) => void,
    updateTimingData: (newData: any) => void,
    updateTeamRadio: (newData: any) => void
}

export const useWebSocketStore = create<IStoreState>(set => ({
    carData: null,
    positionData: null,
    circuitData: null,
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
    teamRadio: null,
    updateCarData: (newData) => set(() => ({ carData: newData })),
    updatePositionData: (newData) => set(() => ({ positionData: newData.Position })),
    updateCircuitData: (newData) => set(() => ({ circuitData: newData })),
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
    updateTeamRadio: (newData) => set(state => ({ teamRadio: deepMerge(state.teamRadio, newData) }))
}))
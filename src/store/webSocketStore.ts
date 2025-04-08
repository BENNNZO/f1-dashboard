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
    timingAppData: ITimingAppData | null
    weatherData: IWeatherData | null,
    trackStatus: ITrackStatus | null,
    driverList: IDriverList | null,
    raceControlMessages: IRaceControlMessages | null,
    sessionInfo: ISessionInfo | null,
    lapCount: ILapCount | null,
    timingData: ITimingData | null,
    teamRadio: ITeamRadio | null,
    updateCarData: (newData: string) => void,
    updatePositionData: (newData: { Position: IPositionData }) => void,
    updateCircuitData: (newData: ICircuitData) => void,
    updateTimingAppData: (newData: Record<string, unknown>) => void,
    updateWeatherData: (newData: Record<string, unknown>) => void,
    updateTrackStatus: (newData: Record<string, unknown>) => void,
    updateDriverList: (newData: Record<string, unknown>) => void,
    updateRaceControlMessages: (newData: Record<string, unknown>) => void,
    updateSessionInfo: (newData: Record<string, unknown>) => void,
    updateLapCount: (newData: Record<string, unknown>) => void,
    updateTimingData: (newData: Record<string, unknown>) => void,
    updateTeamRadio: (newData: Record<string, unknown>) => void
}

export const useWebSocketStore = create<IStoreState>(set => ({
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
    updateTimingAppData: (newData) => set(state => ({ timingAppData: deepMerge(state.timingAppData, newData) as ITimingAppData })),
    updateWeatherData: (newData) => set(state => ({ weatherData: deepMerge(state.weatherData, newData) as IWeatherData })),
    updateTrackStatus: (newData) => set(state => ({ trackStatus: deepMerge(state.trackStatus, newData) as ITrackStatus })),
    updateDriverList: (newData) => set(state => ({ driverList: deepMerge(state.driverList, newData) as IDriverList })),
    updateRaceControlMessages: (newData) => set(state => ({ raceControlMessages: deepMerge(state.raceControlMessages, newData) as IRaceControlMessages })),
    updateSessionInfo: (newData) => set(state => ({ sessionInfo: deepMerge(state.sessionInfo, newData) as ISessionInfo })),
    updateLapCount: (newData) => set(state => ({ lapCount: deepMerge(state.lapCount, newData) as ILapCount })),
    updateTimingData: (newData) => set(state => ({ timingData: deepMerge(state.timingData, newData) as ITimingData })),
    updateTeamRadio: (newData) => set(state => ({ teamRadio: deepMerge(state.teamRadio, newData) as ITeamRadio }))
}))
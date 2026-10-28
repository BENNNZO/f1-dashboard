import { create } from "zustand"

import type { CircuitData } from "@/types/CircuitData.type"
import type { CurrentTyresData } from "@/types/CurrentTyresData.type"
import type { DriverListData } from "@/types/DriverListData.type"
import type { F1Message } from "@/types/F1Message.type"
import type { LapCountData } from "@/types/LapCountData.type"
import type { RaceControlMessages } from "@/types/RaceControlMessages.type"
import type { SessionInfo } from "@/types/SessionInfo.type"
import type { TeamRadioData } from "@/types/TeamRadioData.type"
import type { TimingAppData } from "@/types/TimingAppData.type"
import type { TimingData } from "@/types/TimingData.type"
import type { TrackStatusData } from "@/types/TrackStatusData.type"
import type { WeatherData } from "@/types/WeatherData.type"
import deepMerge from "@/utils/deepMerge"

type F1Data = {
    TimingAppData?: TimingAppData
    WeatherData?: WeatherData
    TrackStatus?: TrackStatusData
    DriverList?: DriverListData
    RaceControlMessages?: RaceControlMessages
    SessionInfo?: SessionInfo
    LapCount?: LapCountData
    TimingData?: TimingData
    TeamRadio?: TeamRadioData
    CurrentTyres?: CurrentTyresData
    [topic: string]: unknown
}

type StoreState = {
    data: F1Data
    circuitData: CircuitData | null
    connection: "connecting" | "connected" | "reconnecting"
    storeF1Message: (message: F1Message) => void
    updateCircuitData: (newData: CircuitData) => void
    setConnection: (connection: "connected" | "reconnecting") => void
}

export const useWebSocketStore = create<StoreState>((set) => ({
    data: {},
    circuitData: null,
    connection: "connecting",
    storeF1Message: (message) => {
        if (message.type === "init") {
            set(() => ({ data: message.data as F1Data }))
        } else {
            set((state) => ({ data: deepMerge(state.data, { [message.type]: message.data }) as F1Data }))
        }
    },
    updateCircuitData: (newData) => set(() => ({ circuitData: newData })),
    setConnection: (connection) => set(() => ({ connection })),
}))

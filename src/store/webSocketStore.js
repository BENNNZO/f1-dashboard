import { create } from "zustand";

export const useWebSocketStore = create(set => ({
    CoordData: "",
    updateCoordData: (newData) => set(() => ({ CoordData: newData }))
}))
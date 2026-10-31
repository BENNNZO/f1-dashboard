"use client"

import Circuit3D from "./Circuit3D"
import CircuitProvider from "./CircuitContext"
import Flag from "./Flag"

export default function CircuitSection() {
    return (
        <div className="relative w-full overflow-hidden">
            <CircuitProvider>
                <Flag />
                <Circuit3D />
            </CircuitProvider>
        </div>
    )
}

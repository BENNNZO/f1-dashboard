import type { CircuitData } from "@/types/CircuitData.type"

import { fitPoints, rotatePoints } from "./positionPoints"

const ROTATION_OFFSETS: Record<number, number> = {
    65: 28.3,
}

export default function buildCircuitPoints(circuitData: CircuitData | null | undefined) {
    if (!circuitData) return

    const rotation = -circuitData.rotation + 180 + (ROTATION_OFFSETS[circuitData.circuitKey] ?? 0)
    const trackPoints = rotatePoints(
        circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] })),
        rotation,
    )

    return fitPoints(trackPoints, -4, -4, 4, 4)
}

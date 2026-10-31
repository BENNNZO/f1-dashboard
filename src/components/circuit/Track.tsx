import * as THREE from "three"

import { useCircuit } from "./CircuitContext"

const BASE_COLOR = "#fff"
const STATUS_COLOR: Record<string, string> = {
    "DOUBLE YELLOW": "#f59e0b",
    YELLOW: "#f59e0b",
    RED: "#ef4444",
}

export default function Track() {
    const { circuitCurve, circuitSegments, segmentFlags } = useCircuit()

    return (
        <>
            {circuitSegments.map((segment) => {
                const segmentColor = STATUS_COLOR[segmentFlags[segment.number]] ?? BASE_COLOR
                const segmentSize = segmentColor === BASE_COLOR ? 0.03 : 0.05

                return (
                    <mesh key={segment.number}>
                        <tubeGeometry args={[segment.curve, 100, segmentSize, 16, false]} />
                        <meshBasicMaterial color={segmentColor} />
                    </mesh>
                )
            })}

            <mesh>
                <tubeGeometry args={[circuitCurve, 1000, 0.08, 16, true]} />
                <meshBasicMaterial
                    color="#fff"
                    side={THREE.BackSide}
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                />
            </mesh>
        </>
    )
}

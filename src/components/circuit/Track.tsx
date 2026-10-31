import * as THREE from "three"

import { useCircuit } from "./CircuitContext"

export default function Track() {
    const { circuitCurve, circuitSegments } = useCircuit()

    return (
        <>
            {circuitSegments.map((segment) => (
                <mesh key={segment.number}>
                    <tubeGeometry args={[segment.curve, 100, 0.03, 16, false]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
            ))}

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

import { Line } from "@react-three/drei"
import * as THREE from "three"

import { useCircuit } from "./CircuitContext"

export default function Track() {
    const { circuitPoints } = useCircuit()

    return (
        <Line
            points={circuitPoints.map(({ x, y }) => new THREE.Vector3(x, -y, 0.06))}
            color="#fff"
            lineWidth={6}
        />
    )
}

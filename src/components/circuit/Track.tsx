import { useMemo } from "react"
import * as THREE from "three"

import { useCircuit } from "./CircuitContext"

const MIN_POINT_DISTANCE = 0.05

export default function Track() {
    const { circuitPoints } = useCircuit()

    const curve = useMemo(() => {
        const points: THREE.Vector3[] = []

        for (const { x, y } of circuitPoints) {
            const point = new THREE.Vector3(x, -y, 0.09)
            if (!points.length || point.distanceTo(points[points.length - 1]) >= MIN_POINT_DISTANCE) points.push(point)
        }

        return new THREE.CatmullRomCurve3(points, true, "centripetal")
    }, [circuitPoints])

    return (
        <>
            <mesh>
                <tubeGeometry args={[curve, 1000, 0.03, 16, true]} />
                <meshBasicMaterial color="#fff" />
            </mesh>

            <mesh>
                <tubeGeometry args={[curve, 1000, 0.08, 16, true]} />
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

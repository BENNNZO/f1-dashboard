import { useMemo } from "react"
import * as THREE from "three"

import type { Point } from "@/utils/positionPoints"

type TrackMeshProps = {
    circuitPoints: Point[]
    width: number
    height: number
    color: string
}

export default function TrackMesh({ circuitPoints, width, height, color }: TrackMeshProps) {
    const geometry = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(
            circuitPoints.map(({ x, y }) => new THREE.Vector3(x, -y, 0)),
            true,
        )

        const radius = Math.min(width, height) / 2
        const x = width / 2 - radius
        const y = height / 2 - radius
        const pill = new THREE.Shape()

        pill.absarc(x, y, radius, 0, Math.PI / 2)
        pill.absarc(-x, y, radius, Math.PI / 2, Math.PI)
        pill.absarc(-x, -y, radius, Math.PI, (Math.PI * 3) / 2)
        pill.absarc(x, -y, radius, (Math.PI * 3) / 2, Math.PI * 2)

        return new THREE.ExtrudeGeometry(pill, { steps: 1000, bevelEnabled: false, extrudePath: curve })
    }, [circuitPoints, width, height])

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

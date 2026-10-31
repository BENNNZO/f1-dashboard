import { CameraControls, Grid } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

import { fitPoints, type Point } from "@/utils/positionPoints"

type Circuit3DProps = {
    circuitPoints: Point[]
}

function TrackMesh({
    circuitPoints,
    width,
    height,
    color,
}: Circuit3DProps & { width: number; height: number; color: string }) {
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

const RESET_DELAY = 5000

export default function Circuit3D({ circuitPoints }: Circuit3DProps) {
    const controls = useRef<CameraControls>(null)
    const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const fittedPoints = useMemo(() => fitPoints(circuitPoints, -1, -1, 1, 1), [circuitPoints])

    function scheduleReset() {
        clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => controls.current?.reset(true), RESET_DELAY)
    }

    return (
        <div
            className="h-full w-full"
            onWheel={scheduleReset}
        >
            <Canvas
                camera={{
                    position: [0, -2.5, 2.2],
                    fov: 20,
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[2, -2, 5]}
                    intensity={1.5}
                />

                <TrackMesh
                    circuitPoints={fittedPoints}
                    width={0.02}
                    height={0.03}
                    color="#ffffff"
                />

                <Grid
                    args={[4, 4]}
                    rotation={[Math.PI / 2, 0, 0]}
                    cellSize={0.1}
                    sectionSize={0.5}
                    cellColor="#222222"
                    sectionColor="#444444"
                    fadeDistance={4}
                />

                <CameraControls
                    ref={controls}
                    onStart={() => clearTimeout(resetTimer.current)}
                    onEnd={scheduleReset}
                />
            </Canvas>
        </div>
    )
}

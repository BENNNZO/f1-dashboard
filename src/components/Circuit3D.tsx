import { CameraControls, Grid } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMemo, useRef } from "react"

import type { CircuitData } from "@/types/CircuitData.type"
import { fitPoints, rotatePoints } from "@/utils/positionPoints"

import TrackMesh from "./TrackMesh"

type Circuit3DProps = {
    circuitData: CircuitData
}

const RESET_DELAY = 5000
const MAX_CAMERA_TILT = (80 * Math.PI) / 180

const ROTATION_OFFSETS: Record<number, number> = {
    65: 28.3,
}

export default function Circuit3D({ circuitData }: Circuit3DProps) {
    const fittedPoints = useMemo(() => {
        const rotation = -circuitData.rotation + 180 + (ROTATION_OFFSETS[circuitData.circuitKey] ?? 0)

        const trackPoints = rotatePoints(
            circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] })),
            rotation,
        )

        return fitPoints(trackPoints, -1, -1, 1, 1)
    }, [circuitData])

    const controls = useRef<CameraControls>(null)
    const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

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
                    up: [0, 0, 1],
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
                    minPolarAngle={0}
                    maxPolarAngle={MAX_CAMERA_TILT}
                    onStart={() => clearTimeout(resetTimer.current)}
                    onEnd={scheduleReset}
                />
            </Canvas>
        </div>
    )
}

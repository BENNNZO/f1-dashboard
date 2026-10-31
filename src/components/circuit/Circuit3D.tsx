import { CameraControls, Grid } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"

import { useCircuit } from "./CircuitContext"
import TrackMesh from "./TrackMesh"

const RESET_DELAY = 5000
const CAMERA_POSITION: [number, number, number] = [0, -1, 3]
const MAX_CAMERA_TILT = (80 * Math.PI) / 180

export default function Circuit3D() {
    const { circuitPoints } = useCircuit()
    const controls = useRef<CameraControls>(null)
    const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    function scheduleCameraReset() {
        clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => controls.current?.reset(true), RESET_DELAY)
    }

    return (
        <div
            className="size-full"
            onWheel={scheduleCameraReset}
        >
            <Canvas
                camera={{
                    position: CAMERA_POSITION,
                    up: [0, 0, 1],
                    fov: 30,
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[2, -2, 5]}
                    intensity={1.5}
                />

                <TrackMesh
                    circuitPoints={circuitPoints}
                    width={0.02}
                    height={0.04}
                    color="#fff"
                />

                <Grid
                    args={[10, 10]}
                    rotation={[Math.PI / 2, 0, 0]}
                    cellSize={0.1}
                    sectionSize={0.5}
                    cellColor="#222222"
                    sectionColor="#444444"
                    fadeDistance={2.5}
                    cellThickness={2}
                />

                <CameraControls
                    ref={controls}
                    minPolarAngle={0}
                    maxPolarAngle={MAX_CAMERA_TILT}
                    onStart={() => clearTimeout(resetTimer.current)}
                    onEnd={scheduleCameraReset}
                />
            </Canvas>
        </div>
    )
}

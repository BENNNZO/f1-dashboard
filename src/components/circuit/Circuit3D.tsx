import { CameraControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"

import GridFloor from "./GridFloor"
import Lighting from "./Lighting"
import Track from "./Track"

const RESET_DELAY = 5000
const MAX_CAMERA_TILT = (80 * Math.PI) / 180

export default function Circuit3D() {
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
                    position: [0, -2, 3],
                    up: [0, 0, 1],
                    fov: 20,
                }}
            >
                <CameraControls
                    ref={controls}
                    minPolarAngle={0}
                    maxPolarAngle={MAX_CAMERA_TILT}
                    onStart={() => clearTimeout(resetTimer.current)}
                    onEnd={scheduleCameraReset}
                />

                <color
                    attach="background"
                    args={["#09090b"]}
                />

                <Lighting />
                <Track />
                <GridFloor />
            </Canvas>
        </div>
    )
}

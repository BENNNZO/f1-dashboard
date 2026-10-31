import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useCallback, useEffect, useRef } from "react"

const RESET_DELAY = 5000
const MAX_CAMERA_TILT = (80 * Math.PI) / 180

export default function CameraRig() {
    const canvas = useThree((state) => state.gl.domElement)
    const controls = useRef<CameraControls>(null)
    const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

    const scheduleCameraReset = useCallback(() => {
        clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => controls.current?.reset(true), RESET_DELAY)
    }, [])

    useEffect(() => {
        canvas.addEventListener("wheel", scheduleCameraReset)
        return () => canvas.removeEventListener("wheel", scheduleCameraReset)
    }, [canvas, scheduleCameraReset])

    return (
        <CameraControls
            ref={controls}
            minPolarAngle={0}
            maxPolarAngle={MAX_CAMERA_TILT}
            onStart={() => clearTimeout(resetTimer.current)}
            onEnd={scheduleCameraReset}
        />
    )
}

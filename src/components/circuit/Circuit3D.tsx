import { Canvas } from "@react-three/fiber"

import CameraRig from "./CameraRig"
import GridFloor from "./GridFloor"
import Track from "./Track"

export default function Circuit3D() {
    return (
        <div className="size-full">
            <Canvas
                flat
                camera={{
                    position: [0, -10, 10],
                    up: [0, 0, 1],
                    fov: 20,
                }}
            >
                <color
                    attach="background"
                    args={["#09090b"]}
                />

                <CameraRig />
                <GridFloor />
                <Track />
            </Canvas>
        </div>
    )
}

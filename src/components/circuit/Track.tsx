import { Fragment } from "react"
import * as THREE from "three"

import { useCircuit } from "./CircuitContext"

const BASE_COLOR = "#fff"
const STATUS_COLOR: Record<string, string> = {
    "DOUBLE YELLOW": "#fbcc1c",
    YELLOW: "#fbcc1c",
    RED: "#f12f32",
}

export default function Track() {
    const { circuitCurve, circuitSegments, segmentFlags } = useCircuit()

    return (
        <>
            {circuitSegments.map((segment) => {
                const segmentColor = STATUS_COLOR[segmentFlags[segment.number]] ?? BASE_COLOR
                const segmentSize = segmentColor === BASE_COLOR ? 0.03 : 0.05

                return (
                    <Fragment key={segment.number}>
                        <mesh>
                            <tubeGeometry args={[segment.curve, 100, segmentSize, 16, false]} />
                            <meshBasicMaterial color={segmentColor} />
                        </mesh>

                        {[0, 1].map((t) => (
                            <mesh
                                key={t}
                                position={segment.curve.getPoint(t)}
                            >
                                <sphereGeometry args={[segmentSize, 16, 8]} />
                                <meshBasicMaterial color={segmentColor} />
                            </mesh>
                        ))}
                    </Fragment>
                )
            })}

            <mesh>
                <tubeGeometry args={[circuitCurve, 1000, 0.1, 16, true]} />
                <meshBasicMaterial
                    color="#fff"
                    side={THREE.BackSide}
                    transparent
                    opacity={0.2}
                    depthWrite={false}
                />
            </mesh>
        </>
    )
}

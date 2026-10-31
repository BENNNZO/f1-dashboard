import { useCircuit } from "./CircuitContext"
import TrackMesh from "./TrackMesh"

export default function Track() {
    const { circuitPoints } = useCircuit()

    return (
        <TrackMesh
            circuitPoints={circuitPoints}
            width={0.02}
            height={0.03}
            color="#ffffff"
        />
    )
}

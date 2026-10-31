import { Grid } from "@react-three/drei"

export default function GridFloor() {
    return (
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
    )
}

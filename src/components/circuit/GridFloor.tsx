import { Grid } from "@react-three/drei"

export default function GridFloor() {
    return (
        <Grid
            args={[100, 100]}
            rotation={[Math.PI / 2, 0, 0]}
            cellSize={0.5}
            sectionSize={2}
            cellColor="#171717"
            sectionColor="#444444"
            fadeDistance={15}
            cellThickness={2}
        />
    )
}

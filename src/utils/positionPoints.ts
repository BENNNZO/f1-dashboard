type Point = {
    x: number
    y: number
}

export function rotatePoints(points: Point[], degrees: number): Point[] {
    const angle = degrees * (Math.PI / 180)
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return points.map(({ x, y }) => ({ x: x * cos - y * sin, y: x * sin + y * cos }))
}

export function getViewBox(points: Point[], padding: number) {
    const xs = points.map((point) => point.x)
    const ys = points.map((point) => point.y)
    const minX = Math.min(...xs) - padding
    const minY = Math.min(...ys) - padding

    return `${minX} ${minY} ${Math.max(...xs) + padding - minX} ${Math.max(...ys) + padding - minY}`
}

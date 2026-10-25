type Point = {
    x: number
    y: number
}

type TransformedPointsData = {
    transformedPoints: Point[]
    minX: number
    minY: number
    width: number
    height: number
    centerX: number
    centerY: number
}

export function rotatePoint(point: Point, center: Point, deg: number): Point {
    const angleRad = deg * (Math.PI / 180)

    const x1 = point.x - center.x
    const y1 = point.y - center.y

    const x2 = x1 * Math.cos(angleRad) - y1 * Math.sin(angleRad)
    const y2 = x1 * Math.sin(angleRad) + y1 * Math.cos(angleRad)

    const rotatedX = x2 + center.x
    const rotatedY = y2 + center.y

    return { x: rotatedX, y: rotatedY }
}

export function paddPoint(point: Point, padding: number): Point {
    return { x: point.x + padding, y: point.y + padding }
}

export function transformPoints(points: Point[], rotation: number, padding: number): TransformedPointsData {
    // ALL of this has a specific order so that the values are positioned correctly
    // ant other order will result in wrongly positioned points
    // pget center > rotate points > get min max width and height > add padding

    const centerX =
        (Math.max(...points.map((p) => p.x)) - Math.min(...points.map((p) => p.x))) / 2 +
        Math.min(...points.map((p) => p.x))
    const centerY =
        (Math.max(...points.map((p) => p.y)) - Math.min(...points.map((p) => p.y))) / 2 +
        Math.min(...points.map((p) => p.y))

    const rotatedPoints = points.map((point) => rotatePoint(point, { x: centerX, y: centerY }, rotation))

    const minX = Math.min(...rotatedPoints.map((point) => point.x))
    const minY = Math.min(...rotatedPoints.map((point) => point.y))

    const width =
        Math.max(...rotatedPoints.map((point) => point.x)) +
        Math.abs(Math.min(...rotatedPoints.map((point) => point.x))) +
        padding * 2
    const height =
        Math.max(...rotatedPoints.map((point) => point.y)) +
        Math.abs(Math.min(...rotatedPoints.map((point) => point.y))) +
        padding * 2

    return {
        transformedPoints: rotatedPoints.map((point) => paddPoint(point, padding)),
        minX,
        minY,
        width,
        height,
        centerX,
        centerY,
    }
}

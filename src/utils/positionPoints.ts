interface point {
    x: number,
    y: number
}

export function rotatePoints(points: point[], center: point, deg: number): point[] {
    return points.map(point => {
        const angleRad = deg * (Math.PI / 180)

        // subtract the center point so the center is now the origin (0, 0)
        const x1 = point.x - center.x
        const y1 = point.y - center.y

        // apply rotation transformation
        const x2 = (x1 * Math.cos(angleRad)) - (y1 * Math.sin(angleRad))
        const y2 = (x1 * Math.sin(angleRad)) + (y1 * Math.cos(angleRad))
        
        // add back the center point
        const rotatedX = x2 + center.x
        const rotatedY = y2 + center.y

        return { x: rotatedX, y: rotatedY }
    })
}

export function paddPoints(points: point[], padding: number): point[] {
    return points.map(point => ({ x: point.x + padding, y: point.y + padding }))
}
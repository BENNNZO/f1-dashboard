interface point {
    x: number,
    y: number
}

interface ITransformedPointsData { 
    transformedPoints: point[], 
    minX: number, 
    minY: number, 
    width: number, 
    height: number, 
    centerX: number, 
    centerY: number 
}

export function rotatePoint(point: point, center: point, deg: number): point {
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
}

export function paddPoint(point: point, padding: number): point {
    return { x: point.x + padding, y: point.y + padding }
}

export function transformPoints(points: point[], rotation: number, padding: number): ITransformedPointsData {
    // ALL of this has a specific order so that the values are positioned correctly
    // ant other order will result in wrongly positioned points
    // pget center > rotate points > get min max width and height > add padding
    
    // get the center of all points
    const centerX = (Math.max(...points.map(p => p.x)) - Math.min(...points.map(p => p.x))) / 2 + Math.min(...points.map(p => p.x))
    const centerY = (Math.max(...points.map(p => p.y)) - Math.min(...points.map(p => p.y))) / 2 + Math.min(...points.map(p => p.y))
    
    // apply rotation transform
    points = points.map(point => rotatePoint(point, { x: centerX, y: centerY }, rotation))
    
    // get min max width and height
    const minX = Math.min(...points.map(point => point.x))
    const minY = Math.min(...points.map(point => point.y))
    
    // max + |min| + (padding * 2) === width or height
    const width = Math.max(...points.map(point => point.x)) + Math.abs(Math.min(...points.map(point => point.x))) + (padding * 2)
    const height = Math.max(...points.map(point => point.y)) + Math.abs(Math.min(...points.map(point => point.y))) + (padding * 2)
    
    // finally apply padding transform and return
    return { transformedPoints: points.map(point => paddPoint(point, padding)), minX, minY, width, height, centerX, centerY }
}
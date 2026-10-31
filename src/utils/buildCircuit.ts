import * as THREE from "three"

import type { CircuitData } from "@/types/CircuitData.type"

import { fitPoints, type Point, rotatePoints } from "./positionPoints"

export type Segment = {
    number: number
    curve: THREE.CatmullRomCurve3
}

const MIN_POINT_DISTANCE = 0.05
const ROTATION_OFFSETS: Record<number, number> = {
    65: 28.3,
}

function nearestIndex({ x, y }: CircuitData, position: Point) {
    let nearest = 0
    let nearestDistance = Infinity

    x.forEach((pointX, index) => {
        const distance = (pointX - position.x) ** 2 + (y[index] - position.y) ** 2

        if (distance < nearestDistance) {
            nearest = index
            nearestDistance = distance
        }
    })

    return nearest
}

function buildCircuitPoints(circuitData: CircuitData) {
    const rotation = -circuitData.rotation + 180 + (ROTATION_OFFSETS[circuitData.circuitKey] ?? 0)
    const trackPoints = rotatePoints(
        circuitData.x.map((x, index) => ({ x: -x, y: circuitData.y[index] })),
        rotation,
    )

    return fitPoints(trackPoints, -4, -4, 4, 4)
}

function buildCircuitCurve(circuitPoints: Point[], closed: boolean) {
    const points: THREE.Vector3[] = []

    circuitPoints.forEach(({ x, y }, index) => {
        const point = new THREE.Vector3(x, -y, 0.09)
        const isLast = index === circuitPoints.length - 1

        if (!points.length || point.distanceTo(points[points.length - 1]) >= MIN_POINT_DISTANCE) points.push(point)
        else if (isLast && !closed) points[points.length - 1] = point
    })

    return new THREE.CatmullRomCurve3(points, closed, "centripetal")
}

function buildCircuitSegments(circuitData: CircuitData, points: Point[]): Segment[] {
    const starts = [...circuitData.marshalSectors]
        .sort((a, b) => a.length - b.length)
        .map(({ number, trackPosition }) => ({
            number,
            start: nearestIndex(circuitData, trackPosition),
        }))

    return starts.map(({ number, start }, index) => {
        const end = starts[(index + 1) % starts.length].start
        const segmentPoints =
            end > start ? points.slice(start, end + 1) : [...points.slice(start), ...points.slice(0, end + 1)]

        return {
            number,
            curve: buildCircuitCurve(segmentPoints, false),
        }
    })
}

export default function buildCircuit(circuitData: CircuitData | null | undefined) {
    if (!circuitData) return

    const points = buildCircuitPoints(circuitData)
    const curve = buildCircuitCurve(points, true)
    const segments = buildCircuitSegments(circuitData, points)

    return { curve, segments }
}

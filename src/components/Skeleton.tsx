"use client"

import { useEffect, useState } from "react"

type SkeletonProps = {
    width?: number
    height?: number
    delay?: number
    rounded?: boolean
}

export default function Skeleton({ width, height, delay, rounded }: SkeletonProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient)
        return (
            <div
                className="shrink-0 animate-pulse bg-white/20"
                style={{
                    width: width ? `${width}px` : "100%",
                    height: height ? `${height}px` : "100%",
                    animationDelay: delay ? `${delay}ms` : "0ms",
                    borderRadius: rounded ? "1000px" : "8px",
                }}
            />
        )
}

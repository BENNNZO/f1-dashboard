"use client"

import { useEffect, useState } from "react"

export default function Skeleton({
    width,
    height,
    delay,
    rounded,
}: {
    width?: number
    height?: number
    delay?: number
    rounded?: boolean
}) {
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
            ></div>
        )
}

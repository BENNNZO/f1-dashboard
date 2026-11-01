"use client"

import Dashboard from "@/components/Dashboard"
import useLiveFeed from "@/hooks/useLiveFeed"

export default function Home() {
    useLiveFeed()

    return <Dashboard />
}

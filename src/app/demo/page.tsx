"use client"

import Dashboard from "@/components/Dashboard"
import useDemoFeed from "@/hooks/useDemoFeed"

export default function Demo() {
    useDemoFeed()

    return <Dashboard />
}

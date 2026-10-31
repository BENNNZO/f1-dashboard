"use client"

import { MotionConfig } from "motion/react"

import CircuitSection from "@/components/circuit/CircuitSection"
import ControlMessages from "@/components/control-messages/ControlMessages"
import DriverList from "@/components/drivers/DriverList"
import StatusBar from "@/components/status-bar/StatusBar"
import TeamRadio from "@/components/team-radio/TeamRadio"
import useLiveFeed from "@/hooks/useLiveFeed"

export default function Home() {
    useLiveFeed()

    return (
        <MotionConfig transition={{ ease: [0.2, 1, 0.2, 1], duration: 0.75 }}>
            <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)]">
                <StatusBar />

                <div className="grid grid-cols-[auto_1fr] grid-rows-[minmax(0,1fr)] border-border border-t">
                    <DriverList />

                    <div className="grid w-full grid-rows-[auto_minmax(0,1fr)] border-border border-l">
                        <CircuitSection />

                        <div className="grid grid-cols-[1fr_1px_1fr] gap-x-px border-t border-t-border bg-card">
                            <ControlMessages />
                            <div className="bg-border" />
                            <TeamRadio />
                        </div>
                    </div>
                </div>
            </div>
        </MotionConfig>
    )
}

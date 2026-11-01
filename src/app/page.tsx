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
            <div className="grid h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)]">
                <StatusBar />

                <div className="grid grid-cols-[minmax(0,1fr)] border-border border-t md:grid-cols-[auto_1fr] md:grid-rows-[minmax(0,1fr)]">
                    <div className="flex min-h-0 flex-col border-border border-t md:contents">
                        <DriverList />
                    </div>

                    <div className="order-first grid w-full grid-rows-[auto_minmax(0,1fr)] border-border md:order-0 md:border-l">
                        <CircuitSection />

                        <div className="hidden grid-rows-[1fr_1px_1fr] border-t border-t-border bg-card md:grid 2xl:grid-cols-[1fr_1px_1fr] 2xl:grid-rows-1">
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

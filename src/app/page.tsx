"use client"

import Circuit from "@/components/Circuit"
import ControlMessages from "@/components/ControlMessages"
import DriverList from "@/components/Drivers/DriverList"
import StatusBar from "@/components/status-bar/StatusBar"
import TeamRadio from "@/components/TeamRadio"
import useLiveFeed from "@/hooks/useLiveFeed"

export default function Home() {
    useLiveFeed()

    return (
        <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)]">
            <StatusBar />

            <div className="grid grid-cols-[auto_1fr] grid-rows-[minmax(0,1fr)] border-white/10 border-t">
                <DriverList />

                <div className="grid w-full grid-rows-[minmax(0,1fr)_minmax(0,2fr)] border-white/10 border-l">
                    <Circuit />

                    <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
                        <ControlMessages />
                        <TeamRadio />
                    </div>
                </div>
            </div>
        </div>
    )
}

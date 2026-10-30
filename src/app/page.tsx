"use client"

import Circuit from "@/components/Circuit"
import ControlMessages from "@/components/ControlMessages"
import DriverList from "@/components/drivers/DriverList"
import StatusBar from "@/components/status-bar/StatusBar"
import TeamRadio from "@/components/TeamRadio"
import useLiveFeed from "@/hooks/useLiveFeed"

export default function Home() {
    useLiveFeed()

    return (
        <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)]">
            <StatusBar />

            <div className="grid grid-cols-[auto_1fr] grid-rows-[minmax(0,1fr)] border-zinc-800 border-t">
                <DriverList />

                <div className="grid w-full grid-rows-[minmax(0,1fr)_minmax(0,1fr)] border-zinc-800 border-l">
                    <Circuit />

                    <div className="grid grid-cols-[1fr_1px_1fr] gap-x-px border-t border-t-zinc-800 bg-zinc-925">
                        <ControlMessages />
                        <div className="bg-zinc-800" />
                        <TeamRadio />
                    </div>
                </div>
            </div>
        </div>
    )
}

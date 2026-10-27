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
        <>
            <div className="hidden h-screen max-h-screen md:block">
                <StatusBar />

                <div className="flex h-[calc(100vh-49px)] flex-row border-white/10 border-t">
                    <DriverList />

                    <div className="grid w-full min-w-1/2 grid-rows-[minmax(0,1fr)_minmax(0,2fr)] border-white/10 border-l duration-150 xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-rows-[minmax(0,2fr)_minmax(0,1fr)]">
                        <Circuit />

                        <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
                            <ControlMessages />
                            <TeamRadio />
                        </div>
                    </div>
                </div>
            </div>

            <div className="block md:hidden">
                <StatusBar />
                <Circuit />
                <DriverList />

                <div className="flex flex-col">
                    <div className="h-96">
                        <ControlMessages />
                    </div>

                    <div className="h-96">
                        <TeamRadio />
                    </div>
                </div>
            </div>
        </>
    )
}

import LapCount from "./LapCount"
import SessionInformation from "./SessionInformation"
import TrackStatus from "./TrackStatus"
import Weather from "./Weather"

export default function StatusBar() {
    return (
        <div className="flex flex-row flex-wrap items-center gap-0.5 bg-card py-1 pb-1.5 pl-3 sm:pb-1 lg:gap-4">
            <SessionInformation />

            <div className="hidden w-px self-stretch bg-border lg:block" />

            <div className="order-last hidden basis-full flex-row justify-center sm:flex sm:justify-start lg:order-0 lg:flex-1 lg:basis-auto">
                <Weather />
            </div>

            <div className="order-first mb-2 flex basis-full flex-row items-center justify-between gap-4 sm:order-0 sm:mb-0 sm:ml-auto sm:basis-auto sm:justify-start">
                <LapCount />
                <TrackStatus />
            </div>
        </div>
    )
}

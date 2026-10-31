import LapCount from "./LapCount"
import SessionInformation from "./SessionInformation"
import TrackStatus from "./TrackStatus"
import Weather from "./Weather"

export default function StatusBar() {
    return (
        <div className="flex items-center justify-between py-1 pl-3">
            <div className="flex flex-row gap-4">
                <SessionInformation />
                <div className="w-px bg-white/10" />
                <Weather />
            </div>

            <div className="flex flex-row gap-6">
                <LapCount />
                <TrackStatus />
            </div>
        </div>
    )
}

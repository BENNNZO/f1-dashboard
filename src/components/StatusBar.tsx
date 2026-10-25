import LapCount from "./LapCount"
import SessionInformation from "./SessionInformation"
import TrackStatus from "./TrackStatus"
import Weather from "./Weather"

export default function StatusBar() {
    return (
        <div className="flex justify-between p-2">
            <div className="hidden gap-2 lg:flex">
                <SessionInformation />
                <div className="my-1 w-px bg-white/10"></div>
                <Weather />
            </div>
            <div className="flex gap-2">
                <LapCount />
                <div className="my-1 w-px bg-white/10"></div>
                <TrackStatus />
            </div>
        </div>
    )
}

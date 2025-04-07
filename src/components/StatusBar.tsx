import Weather from "./Weather"
import SessionInformation from "./SessionInformation"
import LapCount from "./LapCount"
import TrackStatus from "./TrackStatus"

export default function StatusBar() {
    return (
        <div className={`flex justify-between border-b border-white/10 p-2`}>
            <div className="flex gap-2">
                <SessionInformation />
                <div className="w-px bg-white/10 my-1"></div>
                <Weather />
            </div>
            <div className="flex gap-2">
                <LapCount />
                <div className="w-px bg-white/10 my-1"></div>
                <TrackStatus />
            </div>
        </div>
    )
}
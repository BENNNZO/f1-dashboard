import Weather from "./Weather"
import SessionInformation from "./SessionInformation"
import LapCount from "./LapCount"

export default function StatusBar() {
    return (
        <div className="flex justify-between border-b border-white/20 p-2">
            <div className="flex gap-2">
                <Weather />
                <div className="w-px bg-white/20 my-1"></div>
                <SessionInformation />
            </div>
            <LapCount />
        </div>
    )
}
interface ILapCount {
    CurrentLap: number,
    TotalLaps: number
}

export default function LapCount({ data }: { data: ILapCount }) {
    const { CurrentLap, TotalLaps } = data

    return <p className="rounded-full px-3 py-1 bg-neutral-800 font-bold font-mono">{CurrentLap}/{TotalLaps}</p>
}
export default function Skeleton({ width, height }: { width: number | null, height: number | null }) {
    return (
        <div className={`${width ? `w-[${width}px]` : "w-full"} ${height ? `w-[${height}px]` : "h-full"} bg-white/20 animate-pulse rounded-lg`}></div>
    )
}
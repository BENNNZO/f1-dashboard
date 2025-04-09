export default function Skeleton({ width, height, delay }: { width: number | null, height: number | null, delay: number | null }) {
    return (
        <div 
            className={`bg-white/20 animate-pulse rounded-lg`}
            style={{
                width: width ? `${width}px` : "100%",
                height: height ? `${height}px` : "100%",
                animationDelay: delay ? `${delay}ms` : "0ms"
            }}
        ></div>
    )
}
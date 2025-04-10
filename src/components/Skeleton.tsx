export default function Skeleton({ width, height, delay, rounded }: { width: number | null, height: number | null, delay: number | null, rounded?: boolean }) {
    return (
        <div 
            className="bg-white/20 animate-pulse shrink-0"
            style={{
                width: width ? `${width}px` : "100%",
                height: height ? `${height}px` : "100%",
                animationDelay: delay ? `${delay}ms` : "0ms",
                borderRadius: rounded ? "1000px" : "8px"
            }}
        ></div>
    )
}
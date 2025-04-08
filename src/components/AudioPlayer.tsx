"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function AudioPlayer({ src, playing, setPlaying }: { src: string, playing: string, setPlaying: (src: string) => void }) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [duration, setDuration] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const animationRef = useRef<number>(0)
    const sliderRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (playing !== src) {
            audioRef.current?.pause()
            cancelAnimationFrame(animationRef.current)
            setIsPlaying(false)
        }
    }, [playing])

    useEffect(() => {
        if (isPlaying) setPlaying(src)
    }, [isPlaying])

    function updateData() {
        setDuration(audioRef.current?.duration ?? null);
    }

    function resetData() {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    function togglePlayState() {
        setIsPlaying(state => {
            if (state) {
                audioRef.current?.pause()
                cancelAnimationFrame(animationRef.current)
            } else {
                audioRef.current?.play()
                animationRef.current = requestAnimationFrame(animationFrameWhilePlaying)
            }

            return !state
        })
    }

    function animationFrameWhilePlaying() {
        setCurrentTime(audioRef.current?.currentTime ?? 0)
        animationRef.current = requestAnimationFrame(animationFrameWhilePlaying)
    }

    function formatTime(duration: number): string {
        const seconds: number = Math.round(duration % 60)
        const returnedSeconds: string = seconds < 10 ? `0${seconds}` : String(seconds)

        const minutes: number = Math.floor(duration / 60)
        const returnedMinutes: string = minutes < 10 ? `0${minutes}` : String(minutes)

        return `${returnedMinutes}:${returnedSeconds}`
    }

    function sliderClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        e.preventDefault()

        const minX: number = sliderRef.current?.offsetLeft ?? 0
        const maxX: number = minX + (sliderRef.current?.offsetWidth ?? 0)
        const clickX: number = e.pageX

        const percentage: number = (clickX - minX) / (maxX - minX)
        const time: number = (duration ?? 0) * percentage

        if (audioRef.current) audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    return (
        <div className="flex flex-row gap-1 w-full">
            <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={() => updateData()} onEnded={() => resetData()}></audio>

            <div className="flex flex-row pr-2 items-center justify-center">
                <button onClick={() => togglePlayState()} className="cursor-pointer">
                    {isPlaying ? (
                        <Image src="icons/audio_player/pause.svg" width={25} height={25} alt="pause button" className="invert w-6 h-6" />
                    ) : (
                        <Image src="icons/audio_player/play.svg" width={25} height={25} alt="pause button" className="invert w-6 h-6" />
                    )}
                </button>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <p>{formatTime(currentTime)}</p>
                <div ref={sliderRef} onClick={(e) => sliderClickHandler(e)} className="relative w-full bg-zinc-800 rounded-full overflow-hidden group cursor-pointer">
                    <div className="h-2 group-hover:h-4 bg-white pointer-events-none" style={{ width: `${currentTime / (duration ?? 1) * 100}%`, transition: "height 0.1s ease-out" }}></div>
                </div>
                <p>{formatTime((duration ?? 0))}</p>
            </div>
        </div>
    )
}
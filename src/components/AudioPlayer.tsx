"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type AudioPlayerProps = {
    src: string
    playing: string
    setPlaying: (src: string) => void
}

export default function AudioPlayer({ src, playing, setPlaying }: AudioPlayerProps) {
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
    }, [playing, src])

    useEffect(() => {
        if (isPlaying) setPlaying(src)
    }, [isPlaying, src, setPlaying])

    function updateData() {
        setDuration(audioRef.current?.duration ?? null)
    }

    function resetData() {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    function togglePlayState() {
        setIsPlaying((state) => {
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
        <div className="flex w-full flex-row gap-1">
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onLoadedMetadata={() => updateData()}
                onEnded={() => resetData()}
            />

            <div className="flex flex-row items-center justify-center pr-2">
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => togglePlayState()}
                >
                    {isPlaying ? (
                        <Image
                            className="h-6 w-6 invert"
                            src="icons/audio_player/pause.svg"
                            width={25}
                            height={25}
                            alt="pause button"
                        />
                    ) : (
                        <Image
                            className="h-6 w-6 invert"
                            src="icons/audio_player/play.svg"
                            width={25}
                            height={25}
                            alt="pause button"
                        />
                    )}
                </button>
            </div>

            <div className="flex w-full flex-row items-center gap-4">
                <p>{formatTime(currentTime)}</p>

                <div
                    ref={sliderRef}
                    className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-zinc-800"
                    onClick={(e) => sliderClickHandler(e)}
                >
                    <div
                        className="pointer-events-none h-2 bg-white group-hover:h-4"
                        style={{
                            width: `${(currentTime / (duration ?? 1)) * 100}%`,
                            transition: "height 0.1s ease-out",
                        }}
                    />
                </div>

                <p>{formatTime(duration ?? 0)}</p>
            </div>
        </div>
    )
}

"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type AudioPlayerProps = {
    src: string
    playing: string
    setPlaying: (src: string) => void
}

export default function AudioPlayer({ src, playing, setPlaying }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const animationRef = useRef(0)
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

    function formatTime(duration: number) {
        const seconds = Math.round(duration % 60)
        const minutes = Math.floor(duration / 60)

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }

    function sliderClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()

        const minX = sliderRef.current?.offsetLeft ?? 0
        const maxX = minX + (sliderRef.current?.offsetWidth ?? 0)
        const clickX = e.pageX

        const percentage = (clickX - minX) / (maxX - minX)
        const time = (duration ?? 0) * percentage

        if (audioRef.current) audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    return (
        <div className="flex w-full flex-row gap-1">
            {/* biome-ignore lint/a11y/useMediaCaption: F1 sends no captions for team radio */}
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onLoadedMetadata={updateData}
                onEnded={resetData}
            />

            <div className="flex flex-row items-center justify-center pr-2">
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={togglePlayState}
                >
                    <Image
                        className="h-6 w-6 invert"
                        src={`icons/audio_player/${isPlaying ? "pause" : "play"}.svg`}
                        width={25}
                        height={25}
                        alt={isPlaying ? "pause button" : "play button"}
                    />
                </button>
            </div>

            <div className="flex w-full flex-row items-center gap-4">
                <p>{formatTime(currentTime)}</p>

                {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: mouse-only seek bar, the play button works with the keyboard */}
                <div
                    ref={sliderRef}
                    className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-border"
                    onClick={sliderClickHandler}
                >
                    <div
                        className="pointer-events-none h-2 bg-foreground group-hover:h-4"
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

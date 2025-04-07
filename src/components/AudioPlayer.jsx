"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function AudioPlayer({ title, src, playing, setPlaying }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(null)
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef()
    const animationRef = useRef()

    useEffect(() => {
        if (playing !== title) {
            audioRef.current.pause()
            cancelAnimationFrame(animationRef.current)
            setIsPlaying(false)
        }
    }, [playing])

    useEffect(() => {
        if (isPlaying) setPlaying(title)
    }, [isPlaying])

    function updateData() {
        setDuration(audioRef.current.duration);
    }

    function resetData() {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    function togglePlayState() {
        setIsPlaying(state => {
            if (state) {
                audioRef.current.pause()
                cancelAnimationFrame(animationRef.current)
            } else {
                audioRef.current.play()
                animationRef.current = requestAnimationFrame(animationFrameWhilePlaying)
            }

            return !state
        })
    }

    function animationFrameWhilePlaying() {
        setCurrentTime(audioRef.current.currentTime)
        animationRef.current = requestAnimationFrame(animationFrameWhilePlaying)
    }

    function formatTime(duration) {
        const seconds = Math.round(duration % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds

        const minutes = Math.floor(duration / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes

        return `${returnedMinutes}:${returnedSeconds}`
    }

    return (
        <div className="flex flex-row gap-1 rounded-md p-2 pr-6 bg-zinc-900 border border-white/10">
            <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={() => updateData()} onEnded={() => resetData()}></audio>

            <div className="flex flex-row pr-2 items-center justify-center">
                {/* Play / Pause Button */}
                <button onClick={() => togglePlayState()} className="cursor-pointer">
                    {isPlaying ? (
                        <Image src="icons/audio_player/pause.svg" width={25} height={25} alt="pause button" className="invert w-6 h-6" />
                    ) : (
                        <Image src="icons/audio_player/play.svg" width={25} height={25} alt="pause button" className="invert w-6 h-6" />
                    )}
                </button>
            </div>

            <div className="flex flex-col gap-1 w-full">
                {/* Duration/Time + Progress Bar */}
                <div className="flex flex-row items-center gap-4">
                    <p>{formatTime(currentTime)}</p>

                    <div className="relative w-full bg-zinc-800 rounded-full overflow-hidden">
                        {/* <input ref={progressBar} type="range" min={0} max={Math.floor(duration)} defaultValue={0} onChange={(e) => changeTime(e.target.value)} className="audio-progress-bar" /> */}
                        <div className="h-2 bg-white pointer-events-none" style={{ width: `${0.35 + (currentTime / duration * 100)}%` }}></div>
                    </div>

                    <p>{formatTime(duration)}</p>
                </div>
            </div>
        </div>
    )
}
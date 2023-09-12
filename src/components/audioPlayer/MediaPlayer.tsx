import React, { useRef, useState, useEffect } from "react"
import AudioWaves from "./AudioWaves"
import { PlayButton } from "./PlayButton"

export const MediaPlayer = ({ trackUrl }: { trackUrl: boolean }) => {
  const [isPlaying, setIsPlaying]: [isPlaying: boolean, setIsPlaying: any] =
    useState(false)
  const audioRef: any = useRef(null)

  const togglePlay = () => {
    const audio = audioRef.current

    if (audio.paused === false) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    console.log(trackUrl)
  }, [])

  return (
    <div id="mediaplayer">
      {trackUrl ? (
        <>
          <audio id="audio" ref={audioRef}>
            <source src={trackUrl} type="audio/mp3" />
          </audio>
          <div
            id="controls"
            className="flex justify-between align-middle items-center mt-2"
          >
            <PlayButton playAction={togglePlay} state={isPlaying} />
            <AudioWaves isPlaying={isPlaying} />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

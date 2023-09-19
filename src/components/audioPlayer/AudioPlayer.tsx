import React, { useState, useEffect } from "react"
import Spotify from "@assets/images/spotify.svg"
import Cover from "@assets/images/albumcover.png"
import type { Track, LocalToken } from "./types"
import { MediaPlayer } from "./MediaPlayer"

export const AudioPlayer = () => {
  const apiUrl: string = import.meta.env.PUBLIC_SPOTIFY_API

  const [track, setStrack] = useState<Track>()

  const getTrack = async (): Promise<void> => {
    try {
      const data = await fetch(apiUrl, {
        method: "GET",
      })
      const currentTrack = await data.json()
      setStrack(currentTrack.track.items[0].track)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTrack()
  }, [])

  return (
    <section className="player-container flex flex-col justify-between relative overflow-clip bg-[#000000] text-white rounded-xl col-span-2 md:col-span-2 row-span-1 md:row-span-1 shadow-md hover:shadow-xl hover:scale-105 transition-all">
      <header>
        <a
          href="https://spotify.com"
          target="_blank"
          className="flex justify-start items-center align-middle p-2 pb-0 md:p-4"
        >
          <img
            alt="spotify"
            src={Spotify.src}
            className="top-2 left-2 md:top-6 md:left-6 z-10"
          />
          <h2 className="text-l md:text-2xl lg:text-3xl font-bold ml-3 md:ml-5 z-10">
            Recently played
          </h2>
        </a>
      </header>
      <div className="player relative flex flex-col left-2 md:left-0 align-center gap-4 p-2 pt-0 md:p-4">
        <div className="flex items-center gap-4 w-[100%] md:ml-2 md:w-[80%] z-10">
          <img
            alt={track?.album.name || "album name"}
            height={track?.album.images[2].height || 50}
            width={track?.album.images[2].width || 50}
            src={track?.album.images[2].url || Cover.src}
            className="w-10 h-10 md:w-20 md:h-20 lg:h-24 lg:w-24"
          />

          <div className="player-info w-full">
            <p className="text-text text-xs md:text-xl w-full overflow-ellipsis">
              <strong className="">{track?.name || "album name"}</strong>
              <br /> by <span>{track?.artists[0].name || "Artist"}</span>
            </p>
            <MediaPlayer trackUrl={track?.preview_url || ""} />
          </div>
        </div>
      </div>
      <img
        alt={track?.album.name || "💿"}
        height={track?.album.images[1].height || Cover.height}
        width={track?.album.images[2].width || Cover.width}
        src={track?.album.images[2].url || Cover.src}
        className="absolute -top-[50%] -left-0 w-[150%] md:w-[200%] opacity-[0.2] z-0 blur-sm"
        draggable="false"
      />
    </section>
  )
}

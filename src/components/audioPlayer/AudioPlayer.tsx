import React, { useState, useEffect } from "react"
import Spotify from "@assets/images/spotify.svg"
import Cover from "@assets/images/albumcover.png"

interface SpotifyCurrentTrack {
  album: {
    images: {
      url: string
      height: number
      width: number
    }[]
  }
  artists: {
    name: string
  }[]
  name: string
}

export const AudioPlayer = () => {
  const [track, setStrack] = useState<SpotifyCurrentTrack>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing?market=US"
      )
      const data = await response.json()
      console.log(data)
      setStrack(data.item)
    }

    fetchData()
  }, [])

  return (
    <section className="player-container flex flex-col justify-between relative overflow-clip bg-[#000000] text-white p-2 md:p-4 rounded-xl col-span-2 md:col-span-2 row-span-1 md:row-span-1">
      <img
        alt="spotify"
        src="@assets/images/spotify.svg"
        className="absolute top-2 left-2 md:top-6 md:left-6 z-10"
      />
      <div className="player flex flex-col align-center gap-4">
        <h2 className="text-xl md:text-3xl font-bold ml-10 md:ml-0 mt-0 md:mt-20 z-10">
          Recently played
        </h2>
        <div className="flex items-center gap-4 w-[100%] md:w-[80%] z-10">
          <img
            alt={track?.album.name || "album name"}
            height={track?.album.images[2].height || 50}
            width={track?.album.images[2].width || 50}
            src={track?.album.images[2].url || Cover}
            className="w-10 h-10 md:w-20 md:h-20"
          />

          <div className="player-info">
            <p className="text-text text-xs md:text-base">
              <strong className="">{track?.name || "album name"}</strong>
              <br /> by <span>{track?.artists[0].name || "Artist"}</span>
            </p>
            <figure></figure>
          </div>
        </div>
        <img
          alt={track?.album.name || "💿"}
          height={track?.album.images[1].height || 300}
          width={track?.album.images[2].width || 300}
          src={track?.album.images[2].url || Cover}
          className="absolute -top-1/2 -left-0 w-[120%] opacity-[0.2] z-0 blur-sm"
          draggable="false"
        />
      </div>
    </section>
  )
}

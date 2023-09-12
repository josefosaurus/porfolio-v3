import React, { useState, useEffect } from "react"
import Spotify from "@assets/images/spotify.svg"
import Cover from "@assets/images/albumcover.png"
import {
  getParam,
  getAuthorizationCode,
  getAuthToken,
  removeUrlParam,
} from "src/services/player/spotifyAPI"

import type { Track, LocalToken } from "./types"

export const AudioPlayer = () => {
  const apiUrl: string = import.meta.env.PUBLIC_SPOTIFY_API
  const clientId: string = import.meta.env.PUBLIC_SPOTIFY_API_CLIENT_ID
  const clientSecret: string = import.meta.env.PUBLIC_CLIENT_SECRET

  const [track, setStrack] = useState<Track>()
  const mins = new Date().getTime() + 2 * 60000

  const handleAuth = async (reload?: boolean) => {
    const authorizationCode = getParam("code")
    if (!authorizationCode && !reload) {
      getAuthorizationCode(clientId) //TODO: ver si pueod extraer del request la url sin redireccionar
      return
    }
    const token = await getAuthToken({
      authorizationCode,
      clientId,
      clientSecret,
    })
    localStorage.setItem(
      "auth-token",
      JSON.stringify({
        value: token,
        expDate: mins,
      })
    )
    getTrack(token)
  }

  const getTrack = async (token: string): Promise<void> => {
    try {
      const data = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const currentTrack = await data.json()
      setStrack(currentTrack.items[0].track)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const codeParam = getParam("code")
    const localToken: LocalToken = JSON.parse(
      localStorage.getItem("auth-token")
    )

    if (!localStorage.getItem("auth-token")) {
      handleAuth()
      return
    }
    if (codeParam) {
      const url = removeUrlParam(window.location.href, "code")
      window.history.pushState({}, "", url)
      return
    }

    getTrack(localToken.value)
    return
  }, [])

  return (
    <section className="player-container flex flex-col justify-between relative overflow-clip bg-[#000000] text-white rounded-xl col-span-2 md:col-span-2 row-span-1 md:row-span-1">
      <img
        alt="spotify"
        src={Spotify.src}
        className="absolute top-2 left-2 md:top-6 md:left-6 z-10"
      />
      <div className="player relative flex flex-col left-2 md:left-0 align-center gap-4 p-2 md:p-4">
        <h2 className="text-xl md:text-3xl font-bold ml-10 md:ml-2 mt-0 md:mt-20 z-10">
          Recently played
        </h2>
        <div className="flex items-center gap-4 w-[100%] md:ml-2 md:w-[80%] z-10">
          <img
            alt={track?.album.name || "album name"}
            height={track?.album.images[2].height || 50}
            width={track?.album.images[2].width || 50}
            src={track?.album.images[2].url || Cover.src}
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
          height={track?.album.images[1].height || Cover.height}
          width={track?.album.images[2].width || Cover.width}
          src={track?.album.images[2].url || Cover.src}
          className="absolute -top-1/2 -left-0 w-[150%] md:w-[200%] opacity-[0.2] z-0 blur-sm"
          draggable="false"
        />
      </div>
    </section>
  )
}

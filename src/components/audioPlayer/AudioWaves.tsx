import React, { useEffect } from "react"

const DURATION = 4000

const AudioWaves = ({
  isPlaying,
  cols = 6,
}: {
  isPlaying: boolean
  cols?: number
}) => {
  const play = (isOn: boolean) => {
    const waves = document.querySelectorAll(".stroke")
    if (isOn) {
      waves.forEach(function (wave) {
        wave.style.animationPlayState = "running"
      })
      return
    }
    waves.forEach(function (wave) {
      wave.style.animationPlayState = "paused"
    })
  }

  let getArr = (amount: number) =>
    Array.apply(null, Array(amount)).map(function (y, i) {
      return i
    })

  useEffect(() => {
    play(isPlaying)
  }, [isPlaying])

  return (
    <section className="relative w-full">
      <div id="waves" className="h-5">
        {cols > 0 &&
          getArr(cols).map((col) => (
            <div
              key={col}
              className={
                isPlaying
                  ? "stroke transition-all"
                  : "stroke bg-gray-400 transition-all"
              }
            ></div>
          ))}
      </div>
    </section>
  )
}

export default AudioWaves

import React, { useEffect, useState } from "react"
import { Cloudy } from "./weather-states/Cloudy"
import { Sunny } from "./weather-states/Sunny"
import { Rainy } from "./weather-states/Rainy"
// import convertUnits from "convert-units"
import convert from "convert"

interface WeatherData {
  weather: {
    main: string
    description: string
  }[]
  main: {
    temp: number
  }
  name: string
  sys: {
    country: string
  }
}

export const Weather: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<
    WeatherData["weather"][0] | null
  >(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [main, setMain] = useState<WeatherData["main"] | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [sys, setSys] = useState<WeatherData["sys"] | null>(null)
  const [currentHour, setCurrentHour] = useState<number | null>(null)
  const [currentMinutes, setCurrentMinutes] = useState<number | null>(null)

  const fetchData = async () => {
    const response = await fetch(import.meta.env.PUBLIC_OPEN_WEATHER_API)
    const data: WeatherData = await response.json()
    const { weather, main, name, sys } = data
    setCurrentWeather(weather[0])
    setMain(main)
    setName(name)
    setSys(sys)
    setCurrentHour(new Date().getHours())
    setCurrentMinutes(new Date().getMinutes())
  }

  useEffect(() => {
    setLoading(true)
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [])

  return (
    <section
      className={`relative flex flex-col items-center justify-center rounded-xl xs:h-auto col-span-2 row-span-1 overflow-clip p-2 lg:p-4 ${
        currentHour && currentHour < 19 ? "weather-day" : "weather-night"
      }`}
    >
      {currentWeather ? (
        <div className="flex justify-between w-[100%]">
          {loading ? (
            <div className="w-20 md:w-32 h-20 md:h-32 bg-slate-100 rounded-full animate-pulse"></div>
          ) : currentWeather?.main === "Clear" ? (
            <Sunny />
          ) : currentWeather?.main === "Clouds" ? (
            <Cloudy />
          ) : currentWeather?.main === "Drizzle" ||
            currentWeather?.main === "Rain" ? (
            <Rainy />
          ) : (
            <Sunny />
          )}
          {loading ? (
            <div className="animate-pulse flex space-x-4 justify-end md:justify-start flex-grow-[unset] md:flex-grow p-4">
              <div className="flex flex-col space-y-3 justify-center">
                <div className="grid grid-cols-6 md:grid-cols-12  gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-6"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center w-[75%] md:w-[60%]">
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">
                {`${convert(main?.temp, "kelvin").to("celsius").toFixed(0)}°`}
              </h2>
              <p className="text-white text-xs md:text-base lg:text-2xl font-black">
                {`${name}, ${sys?.country}`}
              </p>
              <p className="text-gray-200 text-sm md:text-base lg:text-xl">
                {currentWeather?.description}
                <br />
                {`${currentHour}:${
                  currentMinutes && currentMinutes < 10 ? 0 : ""
                }${currentMinutes}`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center w-[100%]">ups</div>
      )}
    </section>
  )
}

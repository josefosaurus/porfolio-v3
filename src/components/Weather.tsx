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
    fetchData()
  }, [])

  return (
    <section
      className={`relative flex flex-col items-center justify-center rounded-xl xs:h-auto col-span-2 row-span-1 overflow-clip p-2 lg:p-4 ${
        currentHour && currentHour < 19 ? "weather-day" : "weather-night"
      }`}
    >
      {currentWeather ? (
        <div className="flex justify-between w-[100%]">
          {currentWeather?.main === "Clear" ? (
            <Sunny />
          ) : currentWeather?.main === "Clouds" ? (
            <Cloudy />
          ) : currentWeather?.main === "Drizzle" ||
            currentWeather?.main === "Rain" ? (
            <Rainy />
          ) : (
            <Sunny />
          )}
          <div className="flex flex-col justify-start md:justify-center w-[75%] md:w-[50%]">
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
        </div>
      ) : (
        <div className="flex justify-center w-[100%]">ups</div>
      )}
    </section>
  )
}

import React, { useEffect, useState } from "react"

import Pocket from "../../assets/images/pocket.svg"
import Thumb from "../../assets/images/thumb.png"

interface Article {
  resolved_url: string
  resolved_title: string
  domain_metadata: { name: string }
  listen_duration_estimate: string
  top_image_url: string
}

export const Reading = ({
  cols = "col-span-1 md:col-span-2",
  rows = "row-span-1",
}: {
  cols?: string
  rows?: string
}) => {
  const [articles, setArticles] = useState<Article[]>([])

  const getArticles = async () => {
    const pocketUrl = import.meta.env.PUBLIC_POCKET_API
    try {
      const response = await fetch(pocketUrl)
      const data = await response.json()
      setArticles(data.result)
      return
    } catch (err) {
      console.log("🤌🏽 boluuuudo", err)
      return
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <section
      className={`education bg-white relative flex flex-col rounded-xl xs:square overflow-clip p-4 shadow-md hover:shadow-xl hover:scale-105 ${cols} ${rows} transition-all`}
    >
      <a
        href={
          articles.length >= 1
            ? articles[0].resolved_url
            : "https://getpocket.com/"
        }
        className="flex justify-center text-background dark:text-text items-center md:justify-between h-[100%] md:h-auto w-[100%] flex-col md:flex-row"
      >
        <h2 className="text-xs md:text-xl font-bold text-background dark:text-text order-2">
          Latest reading
        </h2>
        <img
          src={Pocket.src}
          alt="code error"
          className="w-8 md:w-[2rem] order-1 mb-6 md:mb-0"
        />
      </a>
      <ul className="flex-col justify-between py-4 hidden md:flex">
        {articles?.length >= 1 ? (
          articles.map((item: Article) => (
            <li key={item.resolved_title}>
              <a
                href={item.resolved_url}
                target="_blank"
                className="text-black hover:text-text dark:text-text dark:hover:text-black flex justify-between border-b mb-2"
              >
                <p>
                  <strong className="hover:underline">
                    {item.resolved_title}
                  </strong>
                  <br />
                  {item.domain_metadata?.name} -{item.listen_duration_estimate}
                  mins
                </p>

                <img
                  alt="article thumb"
                  src={item.top_image_url || Thumb.src}
                  className="w-[50px] h-[50px]"
                  height={50}
                  width={50}
                />
              </a>
            </li>
          ))
        ) : (
          <h2 className="text-center py-4 text-black">🫠 Nothing here</h2>
        )}
      </ul>
    </section>
  )
}

export default Reading

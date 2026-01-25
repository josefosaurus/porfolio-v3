import React, { useState, useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import JSConfetti from 'js-confetti'
import type { Certificate } from '@root/src/types/certificate'

export const Education = ({
  cols = 'col-span-2 md:col-span-2',
  rows = 'row-span-1',
}: {
  cols?: string
  rows?: string
}) => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const swiperRef = useRef<Swiper | null>(null)
  const confettiRef = useRef<JSConfetti | null>(null)

  const themes = {
    platzi: {
      bg: 'bg-[#96C93E]',
      titleColor: 'text-white',
      textColor: 'text-white',
    },
    midudev: {
      bg: 'bg-[#020617]',
      titleColor: 'text-white',
      textColor: 'text-white',
    },
    default: {
      bg: 'bg-white dark:bg-gray-100',
      titleColor: 'text-red-600 dark:text-red-500',
      textColor: 'text-gray-900 dark:text-gray-800',
    },
  }

  const getCertificates = async (): Promise<void> => {
    setLoading(true)

    try {
      const response = await fetch(import.meta.env.PUBLIC_CERTIFICATES_API)
      const data = await response.json()
      setCertificates(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCertificates()
  }, [])

  useEffect(() => {
    if (!loading && certificates.length > 0 && !swiperRef.current) {
      // Initialize Swiper
      swiperRef.current = new Swiper('.educationSwiper', {
        modules: [Autoplay, Pagination],
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: false,
        },
        touchRatio: 1,
        threshold: 10,
        loop: true,
        speed: 300,
        effect: 'slide',
        slidesPerView: 1,
        spaceBetween: 0,
      })

      // Initialize confetti
      confettiRef.current = new JSConfetti()
      const certificateCards = document.querySelectorAll('.certificate-card')
      certificateCards.forEach((card) => {
        card.addEventListener('click', () => {
          confettiRef.current?.addConfetti()
        })
      })
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy()
        swiperRef.current = null
      }
    }
  }, [loading, certificates])

  return (
    <section
      id="education"
      className={`education bg-white dark:bg-gray-100 relative flex flex-col rounded-xl ${cols} ${rows} overflow-clip shadow-md hover:shadow-xl hover:scale-105 transition-all`}
      role="region"
      aria-label="Certificate carousel"
    >
      <h3 className="text-[10px] absolute top-2 left-2 z-10 md:text-xs text-gray-600 dark:text-gray-500 uppercase tracking-wider font-medium mb-2 opacity-60 px-4 pt-4">
        Latest Certification
      </h3>

      {loading ? (
        <div className="flex items-center justify-center h-full p-4">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-300 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-48"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="swiper educationSwiper h-full w-[-webkit-fill-available]">
          <div className="swiper-wrapper">
            {certificates.map((cert, index) => {
              const currentTheme = themes[cert.theme || 'default']
              return (
                <div
                  key={index}
                  className={`swiper-slide w-100 h-full !flex flex-col p-4 justify-center ${currentTheme.bg}`}
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-card flex gap-4 items-center"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-[50px] md:h-[8rem] w-[50px] md:w-[8rem] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h2
                        className={`text-xs md:text-xl font-bold ${currentTheme.titleColor} line-clamp-2 overflow-hidden text-ellipsis`}
                      >
                        {cert.title}
                      </h2>
                      <p className={currentTheme.textColor}>
                        {cert.institution} - {cert.year}
                      </p>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
          <div className="swiper-pagination absolute bottom-2 left-0 right-0 z-10"></div>
        </div>
      )}

      <style>{`
        .educationSwiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .educationSwiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </section>
  )
}

"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
  backgroundUrl: string
  blurAmount: number
  bgBrightness: number
}

export function BackgroundWrapperComponent({
  children,
  backgroundUrl,
  blurAmount,
  bgBrightness,
}: BackgroundWrapperProps) {
  const [activeBackground, setActiveBackground] = useState(backgroundUrl)
  const [prevBackground, setPrevBackground] = useState(backgroundUrl)
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    if (backgroundUrl !== activeBackground) {
      setPrevBackground(activeBackground)
      setIsLoaded(false)

      const img = new Image()
      img.src = backgroundUrl
      img.onload = () => {
        setActiveBackground(backgroundUrl)
        setIsLoaded(true)
      }
    }
  }, [backgroundUrl, activeBackground])

  const getStyle = (url: string) => ({
    backgroundImage: url ? `url(${url})` : undefined,
    filter: url ? `blur(${blurAmount}px) brightness(${bgBrightness}%)` : undefined,
    transform: url ? "scale(1.1)" : undefined,
  })

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-black" />

      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          ...getStyle(prevBackground),
          zIndex: 0,
        }}
      />

      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          ...getStyle(activeBackground),
          zIndex: 1,
        }}
        onTransitionEnd={() => {
          if (isLoaded && activeBackground !== prevBackground) {
            setPrevBackground(activeBackground)
          }
        }}
      />

      <div className="fixed inset-0 bg-black/30 z-[2]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export const BackgroundWrapper = dynamic(() => Promise.resolve(BackgroundWrapperComponent), {
  ssr: false,
})
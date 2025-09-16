"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"

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
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-black" />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
          filter: backgroundUrl ? `blur(${blurAmount}px) brightness(${bgBrightness}%)` : undefined,
          transform: backgroundUrl ? "scale(1.1)" : undefined,
        }}
      />
      <div className="fixed inset-0 bg-black/30" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Disable SSR for this component
export const BackgroundWrapper = dynamic(() => Promise.resolve(BackgroundWrapperComponent), {
  ssr: false,
})

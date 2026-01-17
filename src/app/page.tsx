"use client"

import { useState } from "react"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { Header } from "@/components/header"
import { HomePage } from "@/components/pages/home-page"
import { ThemesPage } from "@/components/pages/themes-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { SettingsProvider, useSettings } from "@/contexts/settings-context"
import { BACKGROUND_OPTIONS } from "@/constants/settings"

function SPAContent() {
  const [currentPage, setCurrentPage] = useState("home")
  const [previousPage, setPreviousPage] = useState("home")
  const [animationKey, setAnimationKey] = useState(0)
  const { settings } = useSettings()

  const getCurrentBackgroundUrl = () => {
    const allBackgrounds = [...BACKGROUND_OPTIONS, ...settings.customBackgrounds]
    const currentBg = allBackgrounds.find((bg) => bg.id === settings.selectedBackground)
    return currentBg?.url || BACKGROUND_OPTIONS[0].url
  }

  const handlePageChange = (page: string) => {
    if (page === currentPage) {
      return
    }

    setPreviousPage(currentPage)
    setCurrentPage(page)
    setAnimationKey((prev) => prev + 1)
  }

  const getAnimationClass = () => {
    if (previousPage === "home" && (currentPage === "themes" || currentPage === "settings")) {
      return "animate-slide-in-right"
    }
    if ((previousPage === "themes" || previousPage === "settings") && currentPage === "home") {
      return "animate-zoom-in"
    }
    if (previousPage === "themes" && currentPage === "settings") {
      return "animate-slide-in-right"
    }
    if (previousPage === "settings" && currentPage === "themes") {
      return "animate-slide-in-left"
    }
    return currentPage === "home" ? "animate-zoom-in" : "animate-slide-in-right"
  }

  const renderCurrentPage = () => {
    const animationClass = getAnimationClass()
    const commonClasses = `${animationClass} h-full`

    switch (currentPage) {
      case "themes":
        return (
          <div key={`themes-${animationKey}`} className={commonClasses}>
            <ThemesPage />
          </div>
        )
      case "settings":
        return (
          <div key={`settings-${animationKey}`} className={commonClasses}>
            <SettingsPage />
          </div>
        )
      default:
        return (
          <div key={`home-${animationKey}`} className={commonClasses}>
            <HomePage onPageChange={handlePageChange} />
          </div>
        )
    }
  }

  return (
    <BackgroundWrapper
      backgroundUrl={getCurrentBackgroundUrl()}
      blurAmount={settings.blurAmount}
      bgBrightness={settings.bgBrightness}
    >
      <div className="h-screen overflow-hidden grid grid-rows-[auto_1fr]">
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        <main className="my-0.5 h-full overflow-hidden">
          {renderCurrentPage()}
        </main>
      </div>
    </BackgroundWrapper>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <SPAContent />
    </SettingsProvider>
  )
}
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CustomBackground {
  id: string
  name: string
  url: string
  description: string
  isCustom: boolean
}

interface Settings {
  selectedBackground: string
  blurAmount: number
  bgBrightness: number
  customBackgrounds: CustomBackground[]
  language: "en" | "vi"
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  addCustomBackground: (background: CustomBackground) => void
  removeCustomBackground: (backgroundId: string) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const defaultSettings: Settings = {
  selectedBackground: "bg1",
  blurAmount: 2,
  bgBrightness: 100,
  customBackgrounds: [],
  language: "en",
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-settings")
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) }
        } catch (error) {
          console.error(error)
          return defaultSettings
        }
      }
    }
    return defaultSettings
  })

  useEffect(() => {
    localStorage.setItem("app-settings", JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const addCustomBackground = (background: CustomBackground) => {
    setSettings((prev) => ({
      ...prev,
      customBackgrounds: [...prev.customBackgrounds, background],
    }))
  }

  const removeCustomBackground = (backgroundId: string) => {
    setSettings((prev) => ({
      ...prev,
      customBackgrounds: prev.customBackgrounds.filter((bg) => bg.id !== backgroundId),
      selectedBackground: prev.selectedBackground === backgroundId ? "bg1" : prev.selectedBackground,
    }))
  }

  const resetSettings = () => {
    setSettings((prev) => ({
      ...defaultSettings,
      customBackgrounds: prev.customBackgrounds,
      language: prev.language
    }))
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, addCustomBackground, removeCustomBackground, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
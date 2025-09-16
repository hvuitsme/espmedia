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
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Initialize state from localStorage on the client side
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-settings")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (error) {
          console.error("Failed to parse saved settings:", error)
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
      customBackgrounds: prev.customBackgrounds, // Keep custom backgrounds
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
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

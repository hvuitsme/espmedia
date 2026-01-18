"use client"

import { useSettings } from "@/contexts/settings-context"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface SettingsPageProps {
  onBack?: () => void
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const tSettings = useTranslations("Settings")
  const { } = useSettings()

  return (
    <div className="h-full flex flex-col bg-white/2 border border-white/10 rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 h-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="w-9 h-9 p-0 bg-transparent text-white ring-1 ring-white/20 hover:bg-white/20 rounded-md transition-all mr-1"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">{tSettings("title")}</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">⚙️</div>
            <h2 className="text-2xl font-semibold text-white drop-shadow-lg">{tSettings("comming_soon")}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { BackgroundSelector } from "@/components/theme/background-selector"
import { BlurControl } from "@/components/theme/blur-control"
import { BrightnessControl } from "@/components/theme/brightness-control"
import { useSettings } from "@/contexts/settings-context"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"

export function ThemesPage() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const t = useTranslations("Themes")

  const handleBackgroundChange = (backgroundId: string) => {
    updateSettings({ selectedBackground: backgroundId })
  }

  const handleBlurChange = (blur: number[]) => {
    updateSettings({ blurAmount: blur[0] })
  }

  const handleBrightnessChange = (brightness: number[]) => {
    updateSettings({ bgBrightness: brightness[0] })
  }

  return (
    <div className="h-full flex flex-col bg-white/2 border border-white/10 rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">{t("title")}</h1>
            </div>

            <Button
              variant="outline"
              onClick={resetSettings}
              className="self-start flex items-center gap-2 bg-white/90 hover:bg-white"
            >
              <RotateCcw className="w-4 h-4" />
              {t("reset")}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <BlurControl blurAmount={settings.blurAmount} onBlurChange={handleBlurChange} />
            <BrightnessControl bgBrightness={settings.bgBrightness} onBgBrightnessChange={handleBrightnessChange} />
          </div>

          <BackgroundSelector
            selectedBackground={settings.selectedBackground}
            onBackgroundChange={handleBackgroundChange}
          />
        </div>
      </div>
    </div>
  )
}
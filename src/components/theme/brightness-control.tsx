"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon } from "lucide-react"
import { useTranslations } from "next-intl"

interface BrightnessControlProps {
  bgBrightness: number
  onBgBrightnessChange: (bgBrightness: number[]) => void
}

export function BrightnessControl({ bgBrightness, onBgBrightnessChange }: BrightnessControlProps) {
  const tBright = useTranslations("Brightness")

  const getBrightnessLabel = (bgBrightness: number) => {
    if (bgBrightness <= 50) return tBright("dark")
    if (bgBrightness <= 80) return tBright("normal")
    if (bgBrightness <= 120) return tBright("bright")
    return tBright("very_bright")
  }

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sun className="w-5 h-5" />
          {tBright("brightness")}
        </CardTitle>
        <CardDescription className="text-white/70">{tBright("brightnessDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-white">{tBright("brightness")}</Label>
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
              {bgBrightness}% {getBrightnessLabel(bgBrightness)}
            </Badge>
          </div>
          <Slider
            value={[bgBrightness]}
            onValueChange={onBgBrightnessChange}
            max={150}
            min={30}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/50">
            <span className="flex items-center gap-1">
              <Moon className="w-3 h-3" />
              {tBright("dark")}
            </span>
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3" />
              {tBright("very_bright")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[50, 80, 100, 130].map((brightnessValue) => (
            <Button
              key={brightnessValue}
              variant="outline"
              size="sm"
              onClick={() => onBgBrightnessChange([brightnessValue])}
              className={`border-white/10 bg-white/5 text-white hover:bg-white/20 transition-all duration-200 ${
                bgBrightness === brightnessValue ? "ring-2 ring-blue-500 bg-white/20" : ""
              }`}
            >
              {brightnessValue}%
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
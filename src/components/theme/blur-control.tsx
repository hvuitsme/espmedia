"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Palette, Theater } from "lucide-react"
import { useTranslations } from "next-intl"

interface BlurControlProps {
  blurAmount: number
  onBlurChange: (blur: number[]) => void
}

export function BlurControl({ blurAmount, onBlurChange }: BlurControlProps) {
  const tBlur = useTranslations("Blurs")

  const getBlurLabel = (blur: number) => {
    if (blur === 0) return tBlur("none")
    if (blur <= 2) return tBlur("light")
    if (blur <= 6) return tBlur("medium")
    return tBlur("strong")
  }

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Palette className="w-5 h-5" />
          {tBlur("blur")}
        </CardTitle>
        <CardDescription className="text-white/70">{tBlur("blurDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-white">{tBlur("blurAmount")}</Label>
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
              {blurAmount}px {getBlurLabel(blurAmount)}
            </Badge>
          </div>
          <Slider 
            value={[blurAmount]} 
            onValueChange={onBlurChange} 
            max={15} 
            min={0} 
            step={0.5} 
            className="w-full" 
          />
          <div className="flex justify-between text-xs text-white/50">
            <span>{tBlur("none")}</span>
            <span>{tBlur("very_blurry")}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0, 2, 6, 10].map((blur) => (
            <Button
              key={blur}
              variant="outline"
              size="sm"
              onClick={() => onBlurChange([blur])}
              className={`border-white/10 bg-white/5 text-white hover:bg-white/20 transition-all duration-200 ${
                blurAmount === blur ? "ring-2 ring-blue-500 bg-white/20" : ""
              }`}
            >
              {blur === 0 ? "Off" : `${blur}px`}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
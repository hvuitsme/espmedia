"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"

interface BlurControlProps {
  blurAmount: number
  onBlurChange: (blur: number[]) => void
}

export function BlurControl({ blurAmount, onBlurChange }: BlurControlProps) {
  const getBlurLabel = (blur: number) => {
    if (blur === 0) return "None"
    if (blur <= 2) return "Light"
    if (blur <= 6) return "Medium"
    return "Strong"
  }

  return (
    <Card className="bg-white/65 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Blur Effect
        </CardTitle>
        <CardDescription>Adjust background blur intensity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Blur Amount</Label>
            <Badge variant="outline" className="bg-white">
              {blurAmount}px {getBlurLabel(blurAmount)}
            </Badge>
          </div>
          <Slider value={[blurAmount]} onValueChange={onBlurChange} max={15} min={0} step={0.5} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>None</span>
            <span>Very Blurry</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0, 2, 6, 10].map((blur) => (
            <Button
              key={blur}
              variant="outline"
              size="sm"
              onClick={() => onBlurChange([blur])}
              className={`bg-white transition-all duration-20 ${blurAmount === blur ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
            >
              {blur}px
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

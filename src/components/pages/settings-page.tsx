"use client"

import { useSettings } from "@/contexts/settings-context"

export function SettingsPage() {
  const { } = useSettings()

  return (
    <div className="h-full flex flex-col bg-white/2 border border-white/10 rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 h-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Settings</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">⚙️</div>
            <h2 className="text-2xl font-semibold text-white drop-shadow-lg">Feature Coming Soon</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
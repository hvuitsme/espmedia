"use client"

import { NextIntlClientProvider } from "next-intl"
import { useSettings } from "@/contexts/settings-context"
import enMessages from "@/messages/en.json"
import viMessages from "@/messages/vi.json"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings()
  const messages = settings.language === "vi" ? viMessages : enMessages

  return (
    <NextIntlClientProvider
      locale={settings.language}
      messages={messages}
      timeZone="Asia/Ho_Chi_Minh"
    >
      {children}
    </NextIntlClientProvider>
  )
}
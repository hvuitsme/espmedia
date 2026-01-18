"use client"

import { Button } from "@/components/ui/button"
import { Settings, Shirt, Languages, Check, Menu } from "lucide-react"
import Image from "next/image"
import { useSettings } from "@/contexts/settings-context"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export function Header({ currentPage, onPageChange, onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const { settings, updateSettings } = useSettings()
  const t = useTranslations("Header")
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  const changeLanguage = (lang: string) => {
    updateSettings({ language: lang as "en" | "vi" })
    setIsLangMenuOpen(false)
  }

  const languages = [
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
  ]

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/2 border border-white/10 rounded-b-md">
      <div className="w-full px-3.5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentPage === "home" && (
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden w-8 h-8 transition-all duration-200 ${
                  isMobileMenuOpen 
                    ? "bg-transparent text-white ring-1 ring-white/20 hover:bg-white/20" 
                    : "text-white hover:bg-white/10"
                }`}
                onClick={onMenuToggle}
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            <div
              onClick={() => onPageChange("home")}
              className="w-8 h-8 bg-gradient-to-br bg-white rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <Image src="/icon/unique_shapes.png" alt="Home Logo" width={24} height={24} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant={currentPage === "themes" ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange("themes")}
              className={`w-9 h-9 p-0 ${
                currentPage === "themes" 
                ? "bg-transparent text-white hover:!bg-white/20 hover:!text-white ring-1 ring-white/20" 
                : "text-white/95 hover:text-white hover:bg-white/20"
              }`}
              title={t("themes")}
            >
              <Shirt className="w-4 h-4" />
            </Button>

            <div 
              className="relative flex items-center"
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                  setIsLangMenuOpen(true)
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                  setIsLangMenuOpen(false)
                }
              }}
            >
              {isLangMenuOpen && (
                <div 
                  className="fixed inset-0 z-10 bg-transparent md:hidden"
                  onClick={() => setIsLangMenuOpen(false)}
                />
              )}

              <Button
                variant={"ghost"}
                className="w-9 h-9 p-0 text-white/95 hover:text-white hover:bg-white/20 relative z-20"
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
              >
                <Languages className="w-4 h-4" />
                <span className="absolute -bottom-1 -right-1 text-[8px] font-bold uppercase bg-black/40 px-1 rounded text-white border border-white/10">
                  {settings.language}
                </span>
              </Button>

              <div
                className={`
                  absolute top-full right-0 pt-2 w-32 transition-all duration-200 z-20 origin-top-right
                  ${isLangMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}
                `}
              >
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-xl p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors
                        ${
                          settings.language === lang.code
                            ? "bg-white/20 text-white font-medium"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      {lang.label}
                      {settings.language === lang.code && <Check className="w-3 h-3 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant={currentPage === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange("settings")}
              className={`w-9 h-9 p-0 ${
                currentPage === "settings"
                  ? "bg-transparent text-white hover:!bg-white/20 hover:!text-white ring-1 ring-white/20"
                  : "text-white/95 hover:text-white hover:bg-white/20"
              }`}
              title={t("settings")}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
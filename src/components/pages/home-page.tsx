"use client"

import { Sidebar } from "@/components/sidebar"

interface HomePageProps {
  onPageChange: (page: string) => void
  isMobileMenuOpen?: boolean
  onCloseMobileMenu?: () => void
}

export function HomePage({ onPageChange, isMobileMenuOpen, onCloseMobileMenu }: HomePageProps) {
  return (
    <div className="flex flex-1 h-full relative">
      <div>
        <Sidebar 
          onPageChange={onPageChange} 
          isOpen={isMobileMenuOpen}
          onClose={onCloseMobileMenu}
        />
      </div>

      <div className={`transition-all duration-300 ease-in-out flex-1`}>
        <div className="h-full bg-white/2 border border-white/10 rounded-md flex items-center justify-center ml-0.5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">Beautiful Wallpapers</h1>
              <p className="text-xl text-white/90 text-pretty">
                Customize your desktop with stunning backgrounds and perfect settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
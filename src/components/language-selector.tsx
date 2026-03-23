"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Locale } from "@/i18n/request"

const languages = [
  { code: "en" as Locale, name: "English", flag: "🇺🇸" },
  { code: "pt" as Locale, name: "Português", flag: "🇵🇹" },
  { code: "es" as Locale, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Locale, name: "Français", flag: "🇫🇷" },
  { code: "de" as Locale, name: "Deutsch", flag: "🇩🇪" }
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, setLocale } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  const handleLanguageChange = (langCode: Locale) => {
    setIsOpen(false)
    setLocale(langCode)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-300 hover:cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language">
        {currentLanguage.flag}
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
        <span className="sm:hidden text-lg">{currentLanguage.flag}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-20 py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-accent/10 transition-colors duration-200 hover:cursor-pointer ${
                  language.code === locale ? "bg-accent/20 text-primary font-medium" : "text-foreground"
                }`}>
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
                {language.code === locale && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

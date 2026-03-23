"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { locales, type Locale } from "@/i18n/request"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Record<string, unknown>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  const [messages, setMessages] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load messages for a specific locale
  const loadMessages = async (targetLocale: Locale) => {
    try {
      const messages = await import(`../messages/${targetLocale}.json`)
      setMessages(messages.default)
    } catch (error) {
      console.error(`Failed to load messages for locale: ${targetLocale}`, error)
      // Fallback to English
      const fallbackMessages = await import(`../messages/en.json`)
      setMessages(fallbackMessages.default)
    }
  }

  // Initialize locale from localStorage or default to English
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    const initialLocale = savedLocale && locales.includes(savedLocale) ? savedLocale : "en"

    setLocale(initialLocale)
    loadMessages(initialLocale).finally(() => setIsLoading(false))
  }, [])

  // Handle locale changes
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
    loadMessages(newLocale)
  }

  if (isLoading) {
    return null // or a loading spinner
  }

  return <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, messages }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

import { getRequestConfig } from "next-intl/server"

// Can be imported from a shared config
export const locales = ["en", "pt", "es", "fr", "de"] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
  // Use English as default locale since we're not using URL-based routing
  const locale = "en"

  return { locale, messages: (await import(`../messages/${locale}.json`)).default }
})

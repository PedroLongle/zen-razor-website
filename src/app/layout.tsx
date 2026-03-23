import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Navigation from "../components/navbar"
import Footer from "../components/footer"
import { FunctionsProvider } from "@/hooks/use-functions"
import LoadingScreen from "@/components/loading"
import { LanguageProvider } from "@/contexts/language-context"

import localFont from "next/font/local"

const rumbleBrave = localFont({ src: "../../public/fonts/RumbleBrave.otf", display: "swap", variable: "--font-rumble-brave" })

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat", preload: true })

export const metadata: Metadata = {
  title: "Zen Razor | Premium Barbershop",
  description: "A modern barbershop offering premium haircuts, shaves, and grooming services"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rumbleBrave.variable} ${montserrat.variable} antialiased overflow-x-hidden overscroll-none`}>
        <LanguageProvider>
          <FunctionsProvider>
            <LoadingScreen />
            <Navigation />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </FunctionsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Zen Razor",
  description: "Get in touch with Zen Razor Barbershop - Schedule an appointment or ask us a question"
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

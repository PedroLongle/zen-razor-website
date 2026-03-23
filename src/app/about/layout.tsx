import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Zen Razor",
  description: "Learn about Zen Razor Barbershop's history, values, and our commitment to exceptional grooming services"
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

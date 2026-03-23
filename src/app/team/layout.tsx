import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Team - Zen Razor",
  description:
    "Meet our skilled team of barbers and stylists at Zen Razor Barbershop. Experienced professionals dedicated to your perfect look."
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

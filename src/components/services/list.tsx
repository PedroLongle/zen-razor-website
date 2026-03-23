"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"
import { ServiceItem } from "@/model/service"

interface ServicesListProps {
  services: ServiceItem[]
}

export default function ServicesList({ services }: ServicesListProps) {
  const t = useTranslations("services")

  if (!services) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No services available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
      {services.map((service) => (
        <div
          key={service.id}
          className="border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
          <div className="aspect-video bg-accent relative overflow-hidden">
            <Image
              src={service.image || "/images/services/haircut.jpg"}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-xl font-heading">{service.name}</h2>
              <span className="text-primary font-medium">{service.price}€</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
            <Link href="/appointments" className="text-primary font-medium hover:underline font-sans flex items-center gap-2">
              {t("bookNow")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

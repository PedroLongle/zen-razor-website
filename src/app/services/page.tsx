"use client"

import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Clock, Euro, ArrowRight, Scissors } from "lucide-react"
import { useFunctions, PublicInformation } from "@/hooks/use-functions"
import { ServiceItem } from "@/model/service"
import ServicesSkeleton from "@/components/services/skeleton"
import { useTranslations } from "@/hooks/use-translations"

export default function ServicesPage() {
  const { data, loading, error } = useFunctions()
  const t = useTranslations("services")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">{t("pageTitle")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-sans">{t("pageDescription")}</p>
      </div>

      {/* Services Grid */}
      <div className="mb-16">
        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesGrid data={data} loading={loading} error={error} />
        </Suspense>
      </div>

      {/* Call to Action */}
      <div className="bg-accent/10 rounded-xl p-8 md:p-12 text-center border border-border">
        <h2 className="text-3xl font-bold mb-4 font-heading">{t("readyTitle")}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto font-sans">{t("readyDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans">
            {t("bookThisService")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans">
            {t("haveQuestions")}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Services Grid Component
function ServicesGrid({
  data,
  loading,
  error
}: {
  data: PublicInformation | undefined
  loading: { data: boolean }
  error: { data: string | null } | undefined
}) {
  const t = useTranslations("services")

  // Display error state
  if (error?.data) {
    return (
      <div className="text-center p-12 border border-red-200 rounded-xl bg-red-50">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-700 mb-2">{t("unableToLoad")}</h3>
          <p className="text-red-600 mb-4">{error.data}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-100 transition-colors">
            {t("tryAgain")}
          </button>
        </div>
      </div>
    )
  }

  // Display loading state
  if (loading.data) {
    return <ServicesSkeleton />
  }

  // Display no services state
  if (!data?.services || data.services.length === 0) {
    return (
      <div className="text-center p-12 border border-border rounded-xl bg-accent/5">
        <div className="max-w-md mx-auto">
          <Scissors className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("noServicesTitle")}</h3>
          <p className="text-muted-foreground">{t("noServicesDescription")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.services.map((service: ServiceItem, index: number) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  )
}

// Individual Service Card Component
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const t = useTranslations("services")
  const commonT = useTranslations("common")

  return (
    <div className="group bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Service Image */}
      <div className="aspect-video bg-accent relative overflow-hidden">
        <Image
          src={service.image || `/images/services/service-${(index % 4) + 1}.jpg`}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          {service.price}
          {commonT("euro")}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 font-heading group-hover:text-primary transition-colors">{service.name}</h3>
          <p className="text-muted-foreground text-sm font-sans leading-relaxed">{service.description}</p>
        </div>

        {/* Service Details */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-sans">
              {service.duration} {commonT("min")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Euro className="h-4 w-4 text-primary" />
            <span className="font-medium font-sans">{service.price}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <Link
          href={`/appointments?service=${service.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md group font-sans">
          {t("bookThisService")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

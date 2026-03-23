"use client"

import AppointmentForm from "../../forms/appointment"
import { useFunctions } from "@/hooks/use-functions"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useTranslations } from "@/hooks/use-translations"

function AppointmentFormWrapper() {
  const { data, error } = useFunctions()
  const searchParams = useSearchParams()
  const preselectedServiceId = searchParams.get("service")
  const t = useTranslations("appointment")

  if (error?.data) {
    return <div className="text-red-500">Error: {error.data}</div>
  }

  if (!data) {
    return <div>{t("errorData")}</div>
  }

  return <AppointmentForm services={data?.services} barbers={data?.barbers} preselectedServiceId={preselectedServiceId} />
}

export default function AppointmentsPage() {
  const t = useTranslations("appointment")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center font-heading">{t("pageTitle")}</h1>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 font-sans">{t("pageDescription")}</p>

      <Suspense fallback={<div>{t("loadingForm")}</div>}>
        <AppointmentFormWrapper />
      </Suspense>
    </div>
  )
}

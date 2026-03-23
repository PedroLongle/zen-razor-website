"use client"

import Image from "next/image"
import MapWrapper from "../../components/google-maps/wrapper"
import { Award, Scissors, Users } from "lucide-react"
import { useFunctions } from "@/hooks/use-functions"
import { useTranslations } from "@/hooks/use-translations"

export default function AboutPage() {
  const { data } = useFunctions()
  const t = useTranslations("about")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
      <h1 className="text-4xl font-bold mb-8 text-center font-heading">{t("title")}</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="mr-14 font-sans">
          <h2 className="text-2xl font-semibold mb-4 font-heading">{t("ourStory")}</h2>
          <p className="text-muted-foreground mb-4">{t("storyDescription1")}</p>
          <p className="text-muted-foreground">{t("storyDescription2")}</p>
        </div>
        <div className="rounded-lg overflow-hidden h-80 relative mt-10">
          <Image
            src="/images/interior.webp"
            alt="Shop Interior"
            className="object-cover"
            width={600}
            height={450}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div className="mb-16 font-sans">
        <h2 className="text-3xl font-semibold mb-6 text-center font-heading mt-2">{t("valuesTitle")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">{t("qualityTitle")}</h3>
            <p className="text-muted-foreground">{t("qualityDescription")}</p>
          </div>
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">{t("expertTitle")}</h3>
            <p className="text-muted-foreground">{t("expertDescription")}</p>
          </div>
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">{t("communityTitle")}</h3>
            <p className="text-muted-foreground">{t("communityDescription")}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-center font-heading">{t("visitUsTitle")}</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">{t("visitUsDescription")}</p>

        <div className="mt-12 font-sans">
          <MapWrapper locationInfo={data?.location} zoom={15} height="400px" markerColor="#FF0000" />
        </div>
      </div>
    </div>
  )
}

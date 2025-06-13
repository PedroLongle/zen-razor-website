'use client'

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import ServicesList from "../components/services/list";
import ServicesSkeleton from "../components/services/skeleton";
import { useFunctions } from "@/hooks/use-functions";
import { useTranslations } from '@/hooks/use-translations';

export default function Home() {
  const { data } = useFunctions();
  const t = useTranslations();

  return (
    console.log("Data",data),
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full flex items-center bg-[url(/images/home.png)] bg-cover bg-center sm:bg-center md:bg-center lg:bg-center bg-no-repeat h-screen sm:h-screen md:h-[50rem] lg:h-[50rem] xl:h-[50rem]"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col justify-center py-8 sm:py-12 md:py-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 font-heading">
              {t('hero.title')} <br />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 font-sans leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-fit">
              <Link 
                href="/appointments" 
                className="inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans"
              >
                {t('hero.bookAppointment')}
              </Link>
              <Link 
                href="/services" 
                className="inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white ring-offset-background transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
              >
                {t('hero.viewServices')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">{t('services.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
              {t('services.description')}
            </p>
          </div>
          
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesList services={data?.services || []} />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
              {t('services.viewAllServices')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-accent rounded-lg relative order-2 md:order-1 overflow-hidden">
              <Image src="/images/interior.webp" alt="Shop Interior" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 font-heading">{t('about.title')}</h2>
              <p className="text-muted-foreground mb-6 font-sans">
                {t('about.description')}
              </p>
              <p className="text-muted-foreground mb-8 font-sans">
                {t('about.experience')}
              </p>
              <Link 
                href="/about" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
              >
                {t('about.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">{t('team.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
              {t('team.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data?.barbers.map((barber, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-accent rounded-full max-w-[240px] mx-auto mb-4 relative overflow-hidden">
                  <Image src={barber.image} alt={barber.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-lg font-heading">{barber.name}</h3>
                <p className="text-primary text-sm font-sans">{barber.title}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/team" 
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
              {t('team.viewFullTeam')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2 font-heading">{t('cta.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">
            {t('cta.description')}
          </p>
          <Link 
            href="/appointments" 
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
            {t('hero.bookAppointment')}
          </Link>
        </div>
      </section>
    </div>
  );
}

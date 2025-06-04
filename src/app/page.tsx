'use client'

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import ServicesList from "../components/services/list";
import ServicesSkeleton from "../components/services/skeleton";
import { useFunctions } from "@/hooks/use-functions";

export default function Home() {
  const { data } = useFunctions();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image src="/images/home.svg" alt="Hero Image" fill className="object-cover" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white ml-2 md:ml-20 mt-24 md:mt-48">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2 font-heading">
            Zen Razor <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-sans">Premium Barbershop</span>
          </h1>

          <p className="text-lg max-w-xl mb-8 font-sans">
            Experience the art of traditional barbering with modern style. Quality cuts, hot towel shaves, and premium grooming services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/appointments" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans"
            >
              Book an Appointment
            </Link>
            <Link 
              href="/services" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white ring-offset-background transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
              From classic cuts to hot towel shaves, our skilled barbers provide a range of premium services to keep you looking your best.
            </p>
          </div>
          
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesList />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
              View All Services
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
              <h2 className="text-3xl font-bold mb-6 font-heading">About Zen Razor</h2>
              <p className="text-muted-foreground mb-6 font-sans">
                Founded in 2010, Zen Razor provides premier barbering services in a relaxed, modern environment. Our skilled team combines traditional techniques with contemporary styles to deliver exceptional grooming experiences.
              </p>
              <p className="text-muted-foreground mb-8 font-sans">
                At Zen Razor, we believe that a great haircut is more than just a service—it's an experience that leaves you looking and feeling your best.
              </p>
              <p className="text-muted-foreground mb-8 font-sans">
                At Zen Razor, we believe that a great haircut is more than just a service—it's an experience that leaves you looking and feeling your best.
              </p>
              <Link 
                href="/about" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
              Our skilled barbers are dedicated to providing you with the best grooming experience possible.
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
              View Full Team
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2 font-heading">Ready for a Fresh Look?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">
            Book your appointment today and experience the Zen Razor difference.
          </p>
          <Link 
            href="/appointments" 
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-sans"
            >
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}

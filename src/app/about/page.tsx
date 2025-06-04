'use client';

import Image from "next/image";
import MapWrapper from "../../components/google-maps/wrapper";
import { Award, Scissors, Users } from "lucide-react";
import { useFunctions } from "@/hooks/use-functions";

export default function AboutPage() {
  const { data } = useFunctions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
      <h1 className="text-4xl font-bold mb-8 text-center font-heading">About Zen Razor</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="mr-14 font-sans">
          <h2 className="text-2xl font-semibold mb-4 font-heading">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2010, Zen Razor began with a simple mission: to provide exceptional grooming services in a relaxed, welcoming environment. What started as a small, two-chair shop has grown into a premier destination for men seeking quality haircuts and shaves.
          </p>
          <p className="text-muted-foreground">
            Our team of skilled barbers combines traditional techniques with modern styles to deliver a cutting-edge experience that leaves our clients looking and feeling their best.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden h-80 relative mt-10">
          <Image 
            src="/images/interior.webp" 
            alt="Shop Interior" 
            className="object-cover"
            width={600}
            height={450}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      <div className="mb-16 font-sans">
        <h2 className="text-3xl font-semibold mb-6 text-center font-heading mt-2">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Quality Service</h3>
            <p className="text-muted-foreground">We're committed to providing premium haircuts and grooming services that exceed expectations.</p>
          </div>
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Expert Craftsmanship</h3>
            <p className="text-muted-foreground">Our barbers are highly trained professionals who take pride in their work and attention to detail.</p>
          </div>
          <div className="p-8 bg-accent/5 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-5">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Community Focus</h3>
            <p className="text-muted-foreground">We're proud to be part of our local community and strive to create a welcoming space for everyone.</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-center font-heading">Visit Us Today</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">
          Experience the Zen Razor difference for yourself. We look forward to welcoming you to our shop and helping you look your best.
        </p>

        <div className="mt-12 font-sans">
          <MapWrapper 
            locationInfo={data?.location}
            zoom={15} 
            height="400px" 
            markerColor="#FF0000"
          />
        </div>
      </div>
    </div>
  );
} 
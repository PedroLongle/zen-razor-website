'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useFunctions } from '@/hooks/use-functions';

export default function ServicesList() {
  const { data, error } = useFunctions();

  // Display a fallback if there's an error
  if (error?.data) {
    return (
      <div className="text-center p-8 border border-red-200 rounded bg-red-50">
        <p className="text-red-600">{error.data}</p>
      </div>
    );
  }

  // Display a fallback if no services were found
  if (!data?.services || data?.services.length === 0) {
    return (
      <div className="text-center p-8 border border-border rounded bg-accent/5">
        <p className="text-muted-foreground">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
      {data?.services.map((service) => (
        <div 
          key={service.id} 
          className="border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
        >
          <div className="aspect-video bg-accent relative overflow-hidden">
            <Image 
              src={service.image || '/images/services/haircut.jpg'}
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
            <Link 
              href="/appointments" 
              className="text-primary font-medium hover:underline font-sans flex items-center gap-2"
            >
              Book Now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 
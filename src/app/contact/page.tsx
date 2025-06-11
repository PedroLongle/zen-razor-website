'use client';

import ContactForm from '../../forms/contact';
import MapWrapper from "../../components/google-maps/wrapper";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useFunctions } from '@/hooks/use-functions';

export default function ContactPage() {
  const { data } = useFunctions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center font-heading">Contact Us</h1>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8 sm:mb-12 font-sans text-sm sm:text-base">
        Have questions or feedback? We&apos;d love to hear from you. Fill out the form below, and we&apos;ll get back to you as soon as possible.
      </p>
      
      <div className="flex flex-col lg:flex-row py-8 sm:py-12 gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-semibold font-heading mb-6">Get in Touch</h2>
          <div className="flex flex-col font-sans pb-8 sm:pb-14 gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground text-sm">
                {data?.location.address}<br />
                {data?.location.city}, {data?.location.country}
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-2">Opening Hours</h3>
              <p className="text-muted-foreground mb-1 text-sm">Monday - Friday: 10:00 AM - 7:00 PM</p>
              <p className="text-muted-foreground mb-1 text-sm">Saturday: 10:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground text-sm">Sunday: Closed</p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-2">Contact Information</h3>
              <p className="text-muted-foreground mb-1 text-sm">Phone: +351 123 456 789</p>
              <p className="text-muted-foreground text-sm">Email: info@zen-razor.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-medium mb-4 font-heading">Follow Us</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className='w-full lg:w-1/2'>
          {data && <ContactForm />}
        </div>
      </div>
      
      <div className="mt-8 sm:mt-12 font-sans">
        <MapWrapper 
          locationInfo={data?.location}
          zoom={15} 
          height="20rem sm:25rem" 
          markerColor="#FF0000"
        />
      </div>
    </div>
  );
} 
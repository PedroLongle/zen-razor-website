'use client'

import { Clock10, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.svg" alt="Zen Razor Logo" width={24} height={24} />
              <h3 className="text-2xl font-heading tracking-wider">ZEN RAZOR</h3>
            </div>
            <p className="text-muted-foreground mr-12">
              Premium barbershop services with a focus on style, comfort, and customer satisfaction.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock10 className="w-5 h-5" />
              <h3 className="text-xl font-heading tracking-wider">HOURS</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Monday - Friday: 9AM - 8PM</li>
              <li>Saturday: 10AM - 6PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-5 h-5" />
              <h3 className="text-xl font-heading tracking-wider">CONTACT</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Style Street, Fashion City</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@zenrazor.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} • Zen Razor Premium Barbershop  •  All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === '/';
  
  // Use useCallback to memoize the scroll handler function
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    // Apply the scroll position check immediately on mount
    handleScroll();
    
    // Use passive event listener to improve performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [handleScroll, isMobileMenuOpen]);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Book Appointment', path: '/appointments' },
    { name: 'Contact', path: '/contact' },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out will-change-transform ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-sm shadow-md' 
          : isHomePage
            ? 'bg-background/40 backdrop-blur-[2px]' 
            : 'bg-background/80 backdrop-blur-sm'
      } border-b border-border/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.svg" alt="Zen Razor Logo" width={24} height={24} />
              <Link href="/" className="flex-shrink-0 flex items-center font-sans">
                <span className="text-2xl font-heading text-primary tracking-wider transition-colors duration-300">ZEN RAZOR</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 font-sans">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors duration-300 font-sans ${
                    pathname === item.path
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                {/* Hamburger icon */}
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu drawer - separate from main nav to avoid z-index issues */}
      <div 
        className={`sm:hidden fixed inset-0 z-50 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop - overlay */}
        <div 
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={closeMobileMenu}
        ></div>
        
        {/* Side drawer panel */}
        <div className={`absolute top-0 right-0 w-64 h-full max-h-screen bg-background shadow-xl flex flex-col overflow-hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Drawer header */}
          <div className="px-4 py-4 border-b border-border flex justify-between items-center bg-background">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.svg" alt="Zen Razor Logo" width={20} height={20} />
              <span className="text-xl font-heading text-primary tracking-wider">ZEN RAZOR</span>
            </div>
            <button 
              onClick={closeMobileMenu}
              className="text-foreground hover:text-primary p-1"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          
          {/* Drawer content - Navigation */}
          <div className="flex-1 px-2 py-2 overflow-y-auto bg-background">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 font-sans ${
                    pathname === item.path
                      ? 'bg-primary/20 text-primary font-bold'
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Drawer footer */}
          <div className="px-4 py-4 border-t border-border bg-background font-sans">
            <a href="tel:+1234567890" className="flex items-center justify-center gap-2 w-full p-3 rounded-md bg-primary text-background hover:bg-primary/90 transition-colors duration-300">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Book by Phone</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 
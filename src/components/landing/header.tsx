'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/landing/logo';

const navLinks = [
  { href: '/#how-it-works', label: 'HOW IT WORKS' },
  { href: '/#services', label: 'SERVICES' },
  { href: '/pricing', label: 'PRICING' },
  { href: '/#about', label: 'ABOUT US' },
  { href: '/team', label: 'OUR TEAM' },
  { href: '/locations', label: 'LOCATIONS' },
  { href: '/contact', label: 'HIRING FORM' },
  { href: '/book-a-consult', label: 'BOOK A CONSULT' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex md:items-center md:gap-2">
            {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
            ))}
          </nav>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-foreground hover:bg-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground border-l">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)}><Logo /></Link>
                  <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-foreground hover:bg-accent">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

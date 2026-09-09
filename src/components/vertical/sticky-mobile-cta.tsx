'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StickyMobileCTAProps {
  ctaText: string;
  ctaLink: string;
}

export function StickyMobileCTA({ ctaText, ctaLink }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-sm border-t md:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Button asChild size="lg" className="w-full bg-primary">
        <Link href={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'corbin-roofing-announcement-dismissed';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage errors
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Event announcement"
      className="w-full bg-primary text-primary-foreground"
    >
      <div className="container flex h-12 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
          <Calendar className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
          <p className="truncate text-xs font-medium uppercase tracking-wider sm:text-sm">
            <span className="hidden sm:inline">Now Hiring &mdash; Visit us at the </span>
            <span className="sm:hidden">See us at the </span>
            <span className="font-bold">2026 Texas Roofing Conference</span>
            <span className="hidden md:inline"> &middot; Gaylord Texan Resort, Grapevine TX</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="h-8 rounded-full bg-primary-foreground px-3 text-xs font-semibold text-primary hover:bg-primary-foreground/90 sm:px-4"
          >
            <Link href="/roofing">Learn More</Link>
          </Button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

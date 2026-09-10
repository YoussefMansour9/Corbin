'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Logo } from '@/components/landing/logo';
import { mainNav, primaryCta, secondaryNav } from '@/lib/site-nav';
import { cn } from '@/lib/utils';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between gap-2">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Corbin Staffing home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex" aria-label="Main">
          <ul className="flex items-center">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block whitespace-nowrap px-2 py-2 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-primary 2xl:px-2.5',
                        active ? 'text-primary' : 'text-foreground/80'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-primary 2xl:px-2.5',
                      active ? 'text-primary' : 'text-foreground/80'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                  </Link>

                  {/* Flyout. Opens on hover and on keyboard focus within. */}
                  <div className="invisible absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-xl border bg-popover shadow-xl">
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-popover-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {item.featured && (
                        <Link
                          href={item.featured.href}
                          className="block border-t bg-muted/50 px-5 py-4 transition-colors hover:bg-muted"
                        >
                          <span className="text-sm font-semibold text-primary">{item.featured.label}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.featured.description}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm" className="hidden h-10 whitespace-nowrap px-3 text-[13px] font-semibold uppercase tracking-wide lg:inline-flex 2xl:px-4">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent xl:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col gap-0 border-l bg-background p-0 text-foreground sm:w-[400px]"
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:bg-accent"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
                <ul className="flex flex-col">
                  {mainNav.map((item) =>
                    item.children ? (
                      <li key={item.href}>
                        <Accordion type="single" collapsible>
                          <AccordionItem value={item.href} className="border-none">
                            <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="pb-2">
                              <ul className="flex flex-col gap-1 border-l pl-4">
                                <li>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-sm font-semibold text-primary"
                                  >
                                    All {item.label}
                                  </Link>
                                </li>
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block py-2 text-sm text-foreground/75 transition-colors hover:text-primary"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block border-b py-3 text-base font-medium transition-colors hover:text-primary',
                            isActive(pathname, item.href) ? 'text-primary' : 'text-foreground/85'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>

                <ul className="mt-6 flex flex-col gap-3 border-t pt-6">
                  {secondaryNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 border-t px-6 py-4">
                <Button asChild size="lg" className="w-full">
                  <Link href={primaryCta.href} onClick={() => setIsOpen(false)}>
                    {primaryCta.label}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

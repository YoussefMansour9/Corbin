'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQItem } from '@/lib/vertical-page-data';

interface VerticalFAQProps {
  headline: string;
  items: FAQItem[];
}

export function VerticalFAQ({ headline, items }: VerticalFAQProps) {
  return (
    <section id="faq" className="py-16 md:py-24 bg-card">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          {headline}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-medium text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

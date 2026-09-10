'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { isEmailJsConfigured, sendEmail } from '@/lib/emailjs';
import { saveLead } from '@/lib/leads/save-lead';
import { consultSchema } from '@/lib/leads/schema';
import { FormHoneypot } from '@/components/landing/form-honeypot';

/**
 * Short consultation form. The content guide keeps this to five fields to
 * reduce friction. The long intake lives in the Ready to Hire form.
 */
const formSchema = consultSchema;

type FormValues = z.infer<typeof formSchema>;

const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_BOOK_CONSULT_TEMPLATE_ID || '';

const fields: { name: keyof FormValues; label: string; placeholder: string; type?: string; full?: boolean }[] = [
  { name: 'name', label: 'Name', placeholder: 'John Smith' },
  { name: 'company', label: 'Company', placeholder: 'Smith & Co.' },
  { name: 'phone', label: 'Phone', placeholder: '(555) 123-4567', type: 'tel' },
  { name: 'email', label: 'Email', placeholder: 'john@company.com', type: 'email' },
  {
    name: 'position',
    label: 'What position do you need help with?',
    placeholder: 'After-hours call agent, administrative assistant, CAD drafter…',
    full: true,
  },
];

export function BookConsultForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const mountedAt = useRef(Date.now());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', position: '' },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Save to the database first. This is the durable record, so an email
    // failure can no longer lose the lead.
    const saved = await saveLead(
      { formType: 'consult', data: values },
      { companyWebsite: honeypot, elapsedMs: Date.now() - mountedAt.current }
    );

    // Then the notification, which is how the team actually hears about it.
    let emailed = false;
    if (isEmailJsConfigured(EMAILJS_TEMPLATE_ID)) {
      try {
        await sendEmail(EMAILJS_TEMPLATE_ID, {
          from_name: values.name,
          from_email: values.email,
          company_name: values.company,
          phone_number: values.phone,
          position_needed: values.position,
          to_name: 'Corbin Staffing',
        });
        emailed = true;
      } catch {
        // Reported below only if the database write also failed.
      }
    }

    setIsSubmitting(false);

    // Only a genuine failure is one where neither path captured the lead.
    if (saved.ok || emailed) {
      toast({
        title: 'Request Received',
        description: "Thanks for reaching out. We'll be in touch shortly to schedule your consultation.",
      });
      form.reset();
      setHoneypot('');
      mountedAt.current = Date.now();
      return;
    }

    toast({
      title: 'Something went wrong',
      description: 'There was an error sending your request. Please try again later.',
      variant: 'destructive',
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
      >
        <FormHoneypot value={honeypot} onChange={setHoneypot} />
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {fields.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field, fieldState }) => (
                <FormItem className={item.full ? 'sm:col-span-2' : undefined}>
                  <FormLabel>
                    {item.label} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={item.type ?? 'text'} placeholder={item.placeholder} {...field} />
                      {!fieldState.error && field.value.length >= 2 && (
                        <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Request My Consultation'
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Hiring for a specific role already?{' '}
          <a href="/contact" className="font-medium text-primary underline hover:no-underline">
            Use the Ready to Hire form
          </a>
          .
        </p>
      </form>
    </Form>
  );
}

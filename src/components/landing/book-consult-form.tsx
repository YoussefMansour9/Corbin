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
import { saveLead, type SubmitFailure } from '@/lib/leads/save-lead';
import { buildMailtoFallback } from '@/lib/leads/submit-messages';
import { FormErrorNotice } from '@/components/landing/form-error-notice';
import { consultSchema } from '@/lib/leads/schema';
import { FormHoneypot } from '@/components/landing/form-honeypot';

/**
 * Short consultation form. The content guide keeps this to five fields to
 * reduce friction. The long intake lives in the Ready to Hire form.
 */
const formSchema = consultSchema;

type FormValues = z.infer<typeof formSchema>;

const fields: { name: keyof FormValues; label: string; type?: string; full?: boolean }[] = [
  { name: 'name', label: 'Name' },
  { name: 'company', label: 'Company' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  {
    name: 'position',
    label: 'What position do you need help with?',
    full: true,
  },
];

export function BookConsultForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [failure, setFailure] = useState<SubmitFailure | null>(null);
  const mountedAt = useRef(Date.now());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', position: '' },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setFailure(null);

    const saved = await saveLead(
      { formType: 'consult', data: values },
      { companyWebsite: honeypot, elapsedMs: Date.now() - mountedAt.current }
    );

    setIsSubmitting(false);

    if (!saved.ok) {
      // Keep everything the visitor typed. Clearing the form on failure
      // would make them retype it, and many simply leave instead.
      setFailure(saved.reason);
      return;
    }

    toast({
      title: 'Request received',
      description: "Thanks for reaching out. We'll be in touch shortly to schedule your consultation.",
    });
    form.reset();
    setHoneypot('');
    mountedAt.current = Date.now();
  }

  const mailtoHref = buildMailtoFallback('Consultation request', {
    Name: form.getValues('name'),
    Company: form.getValues('company'),
    Phone: form.getValues('phone'),
    Email: form.getValues('email'),
    'Position needed': form.getValues('position'),
  });

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
                      <Input type={item.type ?? 'text'} {...field} />
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

        {failure && (
          <FormErrorNotice
            reason={failure}
            mailtoHref={mailtoHref}
            onRetry={form.handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        )}

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

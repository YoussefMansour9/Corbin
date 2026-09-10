'use client';

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { isEmailJsConfigured, sendEmail } from '@/lib/emailjs';
import { saveLead } from '@/lib/leads/save-lead';
import { FormHoneypot } from '@/components/landing/form-honeypot';
import { FormDropdownOption } from '@/lib/vertical-page-data';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  company: z.string().min(2, 'Company name must be at least 2 characters.'),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits.'),
  roleNeeded: z.string().min(1, 'Please select a role'),
});

type FormValues = z.infer<typeof formSchema>;

interface VerticalLeadFormProps {
  headline: string;
  submitText: string;
  dropdownOptions: FormDropdownOption[];
  emailjsTemplateEnvVar: string;
}

export function VerticalLeadForm({
  headline,
  submitText,
  dropdownOptions,
  emailjsTemplateEnvVar,
}: VerticalLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const mountedAt = useRef(Date.now());
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      company: '',
      mobileNumber: '',
      roleNeeded: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Durable record first, notification second.
    const saved = await saveLead(
      { formType: 'vertical', data: { ...data, source: 'roofing-landing-page' } },
      { companyWebsite: honeypot, elapsedMs: Date.now() - mountedAt.current }
    );

    // Use the roofing template if configured, otherwise the consult template.
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_ROOFING_FORM_TEMPLATE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_BOOK_CONSULT_TEMPLATE_ID ||
      '';

    let emailed = false;
    if (isEmailJsConfigured(templateId)) {
      try {
        await sendEmail(templateId, {
          from_name: data.fullName,
          company: data.company,
          phone_number: data.mobileNumber,
          role_needed: data.roleNeeded,
          to_name: 'Corbin Staffing',
          source: 'roofing-landing-page',
        });
        emailed = true;
      } catch {
        // Only surfaced below if the database write also failed.
      }
    }

    setIsSubmitting(false);

    if (!saved.ok && !emailed) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success!',
      description: 'Your request has been sent. We will contact you shortly.',
    });
    form.reset();
    setHoneypot('');
    mountedAt.current = Date.now();
  };

  return (
    <section id="contact-form" className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">{headline}</h2>
        <div className="max-w-xl mx-auto mt-8">
          <div className="bg-card p-6 sm:p-8 rounded-lg border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6">
                <FormHoneypot value={honeypot} onChange={setHoneypot} />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roleNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dropdownOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {submitText}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

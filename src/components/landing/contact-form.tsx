'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { saveLead, type SubmitFailure } from '@/lib/leads/save-lead';
import { buildMailtoFallback } from '@/lib/leads/submit-messages';
import { FormErrorNotice } from '@/components/landing/form-error-notice';
import { hireSchema } from '@/lib/leads/schema';
import { FormHoneypot } from '@/components/landing/form-honeypot';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = hireSchema;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [failure, setFailure] = useState<SubmitFailure | null>(null);
  const mountedAt = useRef(Date.now());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      phoneNumber: '',
      email: '',
      businessWebsite: '',
      jobTitle: '',
      jobDescription: '',
      essentialPrograms: '',
      jobHours: '',
      additionalInfo: '',
      referringAgent: '',
      howDidYouHear: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setFailure(null);

    const saved = await saveLead(
      { formType: 'hire', data: values },
      { companyWebsite: honeypot, elapsedMs: Date.now() - mountedAt.current }
    );

    setIsSubmitting(false);

    if (!saved.ok) {
      // Keep the answers. This form is long, and asking someone to retype a
      // job description after a failure loses the lead outright.
      setFailure(saved.reason);
      return;
    }

    toast({
      title: 'Form submitted',
      description: "Thank you for your inquiry. We'll be in touch within 24 hours.",
    });
    form.reset();
    setHoneypot('');
    mountedAt.current = Date.now();
  }

  const mailtoHref = buildMailtoFallback('Ready to hire enquiry', {
    Name: form.getValues('fullName'),
    Business: form.getValues('businessName'),
    Phone: form.getValues('phoneNumber'),
    Email: form.getValues('email'),
    Website: form.getValues('businessWebsite'),
    Role: form.getValues('jobTitle'),
    'Job description': form.getValues('jobDescription'),
    Software: form.getValues('essentialPrograms'),
    Hours: form.getValues('jobHours'),
    Workplace: form.getValues('workplacePreference'),
    Notes: form.getValues('additionalInfo'),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8 rounded-lg border bg-card p-8"
      >
        <FormHoneypot value={honeypot} onChange={setHoneypot} />
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Website</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role you are hiring for <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="essentialPrograms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please list all required software and programs used for this role</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="jobHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily job hours EST <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else you’d like to share with us?</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="referringAgent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="workplacePreference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Workplace Preference <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="in-office" /></FormControl>
                      <FormLabel className="font-normal">In-Office</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="remote" /></FormControl>
                      <FormLabel className="font-normal">Remote</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="either" /></FormControl>
                      <FormLabel className="font-normal">Either</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {failure && (

          <FormErrorNotice

            reason={failure}

            mailtoHref={mailtoHref}

            onRetry={form.handleSubmit(onSubmit)}

            isSubmitting={isSubmitting}

          />

        )}


        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </Button>
      </form>
    </Form>
  );
}

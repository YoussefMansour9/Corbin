'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  howDidYouHear: z.string().min(2, { message: 'This field is required.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});


// EmailJS credentials from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_BOOK_CONSULT_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export function BookConsultForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      howDidYouHear: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast({
        title: 'Configuration Error',
        description: 'EmailJS is not properly configured. Please contact support.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS if not already done
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
      }
      
      await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${values.firstName} ${values.lastName}`,
          from_email: values.email,
          company_name: values.companyName,
          phone_number: values.phone,
          how_did_you_hear: values.howDidYouHear,
          message: values.message,
          to_name: 'Corbin Staffing',
        }
      );

      toast({
        title: 'Form Submitted!',
        description: "Thank you for your inquiry. We'll be in touch shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'There was an error sending your message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-8 rounded-lg border">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="(555) 555-5555" {...field} />
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
                  <FormLabel>How did you hear about us? <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Google, a friend, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message here..." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'SUBMIT'}
        </Button>
      </form>
    </Form>
  );
}

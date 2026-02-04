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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  businessWebsite: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  jobTitle: z.string().min(2, { message: 'Role you are hiring for must be at least 2 characters.' }),
  jobDescription: z.string().min(20, { message: 'Job description must be at least 20 characters.' }),
  essentialPrograms: z.string().optional(),
  jobHours: z.string().min(5, { message: 'Please specify job hours.' }),
  additionalInfo: z.string().optional(),
  referringAgent: z.string().optional(),
  genderPreference: z.enum(['male', 'female', 'any'], {
    required_error: 'Please select a gender preference.',
  }),
  workplacePreference: z.enum(['in-office', 'remote', 'either'], {
    required_error: 'Please select a workplace preference.',
  }),
  howDidYouHear: z.string().optional(),
});


// EmailJS credentials from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_HIRING_FORM_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          from_name: values.fullName,
          from_email: values.email,
          business_name: values.businessName,
          phone_number: values.phoneNumber,
          business_website: values.businessWebsite,
          job_title: values.jobTitle,
          job_description: values.jobDescription,
          essential_programs: values.essentialPrograms,
          job_hours: values.jobHours,
          additional_info: values.additionalInfo,
          referring_agent: values.referringAgent,
          gender_preference: values.genderPreference,
          workplace_preference: values.workplacePreference,
          how_did_you_hear: values.howDidYouHear,
          to_name: 'Corbin Staffing',
        }
      );

      toast({
        title: 'Form Submitted!',
        description: "Thank you for your inquiry. We'll be in touch within 24 hours.",
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  <Input placeholder="Acme Inc." {...field} />
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
                  <Input placeholder="(555) 555-5555" {...field} />
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
                  <Input placeholder="john.doe@example.com" {...field} />
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
                    <Input placeholder="https://www.example.com" {...field} />
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
                    <Input placeholder="e.g., Senior Virtual Assistant" {...field} />
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
                    <Textarea placeholder="Please include a full length summary of the job requirements..." rows={5} {...field} />
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
                    <Textarea placeholder="e.g., Excel, Cad, QuickBooks" rows={3} {...field} />
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
                    <Input placeholder="e.g., M-F 9 AM - 5 PM" {...field} />
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
                    <Textarea placeholder="Any other details..." rows={3} {...field} />
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
                    <Input placeholder="Agent's name (if any)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="genderPreference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Candidate Gender Preference <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="male" /></FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="female" /></FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="any" /></FormControl>
                      <FormLabel className="font-normal">Any</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <Input placeholder="e.g., Google, a friend, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </Button>
      </form>
    </Form>
  );
}

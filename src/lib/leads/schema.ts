import { z } from 'zod';

/**
 * One schema per form, shared by the browser and the API route so validation
 * rules cannot drift. Previously these lived only in the client, which meant
 * anything could be posted straight past them.
 */

const email = z.string().max(254).email({ message: 'Please enter a valid email address.' });
const phone = z.string().min(10).max(40, { message: 'Please enter a valid phone number.' });

/** Fields every form sends alongside the visitor's answers. */
export const metaSchema = z.object({
  // Honeypot. Real people never see this input, so anything in it is a bot.
  // Deliberately permissive: the route checks it before validation runs, so a
  // rejection never names the field and reveals the trap.
  companyWebsite: z.string().optional(),
  // Milliseconds between the form mounting and submitting.
  elapsedMs: z.number().int().nonnegative().optional(),
  attribution: z
    .object({
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmTerm: z.string().optional(),
      utmContent: z.string().optional(),
      referrer: z.string().optional(),
      landingPath: z.string().optional(),
      pagePath: z.string().optional(),
    })
    .optional(),
});

/** Short consultation form: five fields, to keep friction low. */
export const consultSchema = z.object({
  name: z.string().max(120).min(2, { message: 'Please enter your name.' }),
  company: z.string().max(160).min(2, { message: 'Please enter your company name.' }),
  phone,
  email,
  position: z.string().max(200).min(2, { message: 'Let us know which position you need help with.' }),
});

/** Long "ready to hire" intake. */
export const hireSchema = z.object({
  fullName: z.string().max(120).min(2, { message: 'Full name must be at least 2 characters.' }),
  businessName: z.string().max(160).min(2, { message: 'Business name must be at least 2 characters.' }),
  phoneNumber: phone.max(40),
  email,
  businessWebsite: z.string().max(500).url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  jobTitle: z.string().max(200).min(2, { message: 'Role you are hiring for must be at least 2 characters.' }),
  jobDescription: z.string().max(5000).min(20, { message: 'Job description must be at least 20 characters.' }),
  essentialPrograms: z.string().max(1000).optional(),
  jobHours: z.string().max(200).min(5, { message: 'Please specify job hours.' }),
  additionalInfo: z.string().max(5000).optional(),
  referringAgent: z.string().max(160).optional(),
  workplacePreference: z.enum(['in-office', 'remote', 'either'], {
    required_error: 'Please select a workplace preference.',
  }),
  howDidYouHear: z.string().max(200).optional(),
});

/** Short form used by campaign landing pages such as /roofing. */
export const verticalSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name.' }),
  company: z.string().min(2, { message: 'Please enter your company name.' }),
  mobileNumber: phone.max(40),
  roleNeeded: z.string().max(200).min(1, { message: 'Please choose a role.' }),
  source: z.string().max(100).optional(),
});

/** What the API route accepts: a form type, its payload, and the meta block. */
export const leadRequestSchema = z.discriminatedUnion('formType', [
  z.object({ formType: z.literal('consult'), data: consultSchema }).merge(metaSchema),
  z.object({ formType: z.literal('hire'), data: hireSchema }).merge(metaSchema),
  z.object({ formType: z.literal('vertical'), data: verticalSchema }).merge(metaSchema),
]);

export type ConsultInput = z.infer<typeof consultSchema>;
export type HireInput = z.infer<typeof hireSchema>;
export type VerticalInput = z.infer<typeof verticalSchema>;
export type LeadRequest = z.infer<typeof leadRequestSchema>;

/** Shape of a row in the `leads` table, before server-side fields are added. */
export interface LeadRow {
  form_type: 'consult' | 'hire' | 'vertical';
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position_needed: string | null;
  business_website: string | null;
  job_title: string | null;
  job_description: string | null;
  essential_programs: string | null;
  job_hours: string | null;
  additional_info: string | null;
  referral: string | null;
  workplace_preference: string | null;
  how_did_you_hear: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
  page_path: string | null;
}

/**
 * Flattens a validated request into a row for the `leads` table.
 *
 * Every branch returns the same full shape with unused columns set to null,
 * rather than a union: the Supabase insert types infer from a single object,
 * so a union of partial shapes fails to typecheck.
 */
export function toLeadRow(request: LeadRequest): LeadRow {
  const a = request.attribution ?? {};

  const base: LeadRow = {
    form_type: request.formType,
    name: '',
    email: null,
    phone: null,
    company: null,
    position_needed: null,
    business_website: null,
    job_title: null,
    job_description: null,
    essential_programs: null,
    job_hours: null,
    additional_info: null,
    referral: null,
    workplace_preference: null,
    how_did_you_hear: null,
    source: null,
    utm_source: a.utmSource ?? null,
    utm_medium: a.utmMedium ?? null,
    utm_campaign: a.utmCampaign ?? null,
    utm_term: a.utmTerm ?? null,
    utm_content: a.utmContent ?? null,
    referrer: a.referrer ?? null,
    landing_path: a.landingPath ?? null,
    page_path: a.pagePath ?? null,
  };

  if (request.formType === 'consult') {
    const d = request.data;
    return {
      ...base,
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company,
      position_needed: d.position,
    };
  }

  if (request.formType === 'hire') {
    const d = request.data;
    return {
      ...base,
      name: d.fullName,
      email: d.email,
      phone: d.phoneNumber,
      company: d.businessName,
      business_website: d.businessWebsite || null,
      job_title: d.jobTitle,
      job_description: d.jobDescription,
      essential_programs: d.essentialPrograms || null,
      job_hours: d.jobHours,
      additional_info: d.additionalInfo || null,
      referral: d.referringAgent || null,
      workplace_preference: d.workplacePreference,
      how_did_you_hear: d.howDidYouHear || null,
    };
  }

  const d = request.data;
  return {
    ...base,
    name: d.fullName,
    // This form asks for a phone number only.
    phone: d.mobileNumber,
    company: d.company,
    position_needed: d.roleNeeded,
    source: d.source ?? null,
  };
}

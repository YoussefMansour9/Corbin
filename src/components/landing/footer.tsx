import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/landing/logo';
import { industries } from '@/lib/industries-data';
import { mainNav, primaryCta, secondaryNav } from '@/lib/site-nav';

const companyLinks = [
  ...mainNav.filter((item) => item.href !== '/'),
  primaryCta,
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Finding skilled employees shouldn't be expensive or complicated. Let us find the right
              professionals for your needs.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/share/1LKHR1dMGb/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/posts/corbin-staffing_finding-skilled-employees-shouldnt-be-expensive-activity-7421636819450142720-pVcl?utm_source=share&utm_medium=member_ios&rcm=ACoAADgSDhkBEAlS_UQpQkpEXHx9w8njPw_TVj4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Company */}
          <nav aria-label="Footer company links" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">Company</h2>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-label="Footer industry links" className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">Industries</h2>
            <ul className="space-y-2.5">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">Get in Touch</h2>
            <ul className="space-y-2.5">
              {secondaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:info@corbinstaffing.com"
                className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>info@corbinstaffing.com</span>
              </a>
              <address className="flex items-start gap-2 text-sm not-italic text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  1108 Kane Concourse, STE 311,
                  <br />
                  Bay Harbor Island, FL 33154
                </span>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Corbin Staffing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

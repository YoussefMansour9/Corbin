import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/landing/logo';
import { footerNav } from '@/lib/site-nav';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          {/* Brand and contact */}
          <div className="space-y-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Vetted remote staff for U.S. businesses, starting at $7/hour.
            </p>

            <div className="space-y-2.5">
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
                  Bay Harbor Islands, FL 33154
                </span>
              </address>
            </div>

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

          {/* Link columns, grouped exactly as the revamp guide specifies. */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.heading} aria-label={`Footer ${column.heading} links`}>
                <h2 className="text-sm font-bold uppercase tracking-wider">{column.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
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
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Corbin Staffing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

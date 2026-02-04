import { Logo } from '@/components/landing/logo';
import { Facebook, Linkedin, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Logo />
            </div>
            <p className="text-base text-muted-foreground">
              Finding skilled employees shouldn’t be expensive or complicated.
              Let us find the right professionals for your needs.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:info@corbinstaffing.com"
                className="flex items-center justify-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground md:justify-start"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@corbinstaffing.com</span>
              </a>
              <address className="flex items-start justify-center gap-2 text-base text-muted-foreground not-italic md:justify-start md:text-left">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  1108 Kane Concourse, STE 311,
                  <br />
                  Bay Harbor Island, FL 33154
                </span>
              </address>
            </div>
          </div>

          {/* Column 3: Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <a
                href="https://www.facebook.com/share/1LKHR1dMGb/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <Facebook className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/posts/corbin-staffing_finding-skilled-employees-shouldnt-be-expensive-activity-7421636819450142720-pVcl?utm_source=share&utm_medium=member_ios&rcm=ACoAADgSDhkBEAlS_UQpQkpEXHx9w8njPw_TVj4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 text-center text-base text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Corbin Staffing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

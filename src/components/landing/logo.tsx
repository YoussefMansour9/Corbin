import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Logo.png"
        alt="Corbin Staffing Logo"
        width="220"
        height="49"
      />
    </div>
  );
}

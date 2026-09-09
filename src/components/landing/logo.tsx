import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Image
        src="/images/Logo.png"
        alt="Corbin Staffing Logo"
        width={220}
        height={49}
        priority
      />
    </div>
  );
}

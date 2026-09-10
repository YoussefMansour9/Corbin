import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Image
        src="/images/logo-wordmark.png"
        alt="Corbin Staffing"
        width={660}
        height={196}
        priority
        // Narrower on xl so the full 9-item nav and the CTA fit on one row.
        className="h-auto w-[180px] 2xl:w-[220px]"
      />
    </div>
  );
}

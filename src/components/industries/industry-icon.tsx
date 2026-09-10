import {
  Briefcase,
  Building2,
  DraftingCompass,
  FileSpreadsheet,
  Headset,
  Home,
  ServerCog,
  ShieldCheck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  DraftingCompass,
  FileSpreadsheet,
  Headset,
  Home,
  ServerCog,
  ShieldCheck,
  UtensilsCrossed,
};

export function IndustryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Briefcase;
  return <Icon className={className} aria-hidden="true" />;
}

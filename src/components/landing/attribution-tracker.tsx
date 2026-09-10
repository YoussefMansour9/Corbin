'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/leads/attribution';

/** Records campaign source once per session, on the visitor's first page. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}

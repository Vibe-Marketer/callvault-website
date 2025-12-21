'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface TermlyEmbedProps {
  policyId: string;
  policyName: string;
}

export default function TermlyEmbed({ policyId, policyName }: TermlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Termly will auto-render when the script loads
    // This effect can handle any cleanup if needed
  }, [policyId]);

  return (
    <>
      <Script
        src="https://app.termly.io/embed-policy.min.js"
        strategy="afterInteractive"
      />
      <div
        ref={containerRef}
        data-id={policyId}
        data-type="iframe"
        className="min-h-[600px]"
        aria-label={policyName}
      />
    </>
  );
}

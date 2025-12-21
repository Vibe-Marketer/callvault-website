'use client';

import { useState } from 'react';

const faqs = [
  { question: 'Does this replace Fathom?', answer: 'No, CallVault works alongside Fathom. Fathom records and transcribes; CallVault organizes, analyzes, and mines that data for long-term value.' },
  { question: 'Who can see my recordings?', answer: 'Only you. We take privacy seriously. Your data is encrypted and never shared with third parties or used to train public AI models.' },
  { question: 'What happens if I downgrade from Pro?', answer: "You'll keep access to your most recent 50 calls. Older calls will be locked but safe until you re-upgrade. You can always export your data before downgrading." },
  { question: 'Do I need to install anything?', answer: 'No installation required. CallVault is a web app that connects directly to your Fathom account via secure API.' },
  { question: 'Can I import past calls?', answer: 'Yes! When you connect Fathom, we can automatically sync your entire history so you can start mining insights immediately.' },
];

// FAQPage schema for AEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section id="faq" className="section bg-white">
        <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-100">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-6 flex items-center justify-between text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="pb-6 text-slate-600 leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}

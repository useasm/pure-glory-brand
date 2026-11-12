import { InfoPage, InfoSection } from './InfoPage';

interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <InfoPage title={title} eyebrow="Legal">
      <div
        className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 p-4"
        style={{
          border: '1px dashed var(--border-hairline-strong)',
          fontSize: 'var(--fs-small)',
          color: 'var(--text-secondary)',
        }}
      >
        <span className="eyebrow" style={{ color: 'var(--pg-oxblood)' }}>
          Placeholder content
        </span>
        <span>Template text, not a real legal document. Last updated {updated}.</span>
      </div>

      {sections.map((s, i) => (
        <InfoSection key={s.title} index={String(i + 1).padStart(2, '0')} title={s.title}>
          {s.paragraphs.map((p, j) => (
            <p key={j} className="m-0">
              {p}
            </p>
          ))}
        </InfoSection>
      ))}
    </InfoPage>
  );
}

export const OFFER_SECTIONS: LegalSection[] = [
  {
    title: 'General provisions',
    paragraphs: [
      'This document is a public offer and sets out the terms on which goods are sold through this site. By placing an order the buyer confirms that they accept these terms.',
    ],
  },
  {
    title: 'Subject of the offer',
    paragraphs: [
      'The seller undertakes to hand over the goods, handmade pieces produced in limited numbers, and the buyer undertakes to accept and pay for them under the terms of this offer.',
      'Every piece is unique. Minor differences from the photographs are a feature of handmade work, not a defect.',
    ],
  },
  {
    title: 'Ordering and payment',
    paragraphs: [
      'Orders are placed through the cart on this site. Prices are in Russian roubles. Payment is made by the methods offered at checkout. An order is considered accepted once payment is confirmed.',
    ],
  },
  {
    title: 'Shipping',
    paragraphs: [
      'Shipping terms and timings are described on the “Shipping & returns” page and form an integral part of this offer.',
    ],
  },
  {
    title: 'Returns and exchanges',
    paragraphs: [
      'Returns and exchanges follow the rules published on the “Shipping & returns” page and the applicable consumer protection law.',
    ],
  },
  {
    title: 'Seller details',
    paragraphs: ['To be added. This section is a placeholder.'],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: 'What data is collected',
    paragraphs: [
      'Name, email address, phone number and shipping address. Only what you provide when you place an order, sign up or subscribe to updates.',
    ],
  },
  {
    title: 'What it is used for',
    paragraphs: [
      'To fulfil your order, contact you about shipping, keep your account working and, only with your consent, send emails about new work.',
    ],
  },
  {
    title: 'Who it is shared with',
    paragraphs: [
      'Shipping carriers (as far as needed to send your order) and payment providers (to process the payment). Data is never sold or passed to third parties for marketing.',
    ],
  },
  {
    title: 'Storage and protection',
    paragraphs: [
      'Data is stored on protected servers with restricted access. You can ask for your data to be deleted through any of the channels on the “Contacts” page.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'The site uses browser storage for the cart, saved pieces and sign-in. Disabling it may limit what the site can do.',
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: 'Using the site',
    paragraphs: [
      'The site exists to show Pure Glory pieces and to sell them. By using it you agree to these terms.',
    ],
  },
  {
    title: 'Intellectual property',
    paragraphs: [
      'Everything on the site, including photographs, texts, images of the work, the painting “Downpour Without an Umbrella or Your Eyes”, the logo and the visual identity, belongs to its author. It may not be used without written permission.',
    ],
  },
  {
    title: 'User account',
    paragraphs: [
      'You are responsible for keeping your sign-in details safe. If you suspect someone else has access to your account, get in touch.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'The information on the site is meant to be accurate, but mistakes are possible. Colours may look slightly different depending on your screen.',
    ],
  },
  {
    title: 'Changes to these terms',
    paragraphs: [
      'These terms may be updated. The current version is always the one published on this page.',
    ],
  },
];

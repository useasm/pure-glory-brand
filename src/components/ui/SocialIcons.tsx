import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const TelegramIcon = () => (
  <svg {...base}>
    <path d="M21.5 4.5 3.4 11.2c-.9.34-.86 1.6.05 1.9l4.55 1.5 1.68 5.03c.28.85 1.36 1.05 1.93.36l2.14-2.6 4.4 3.14c.6.43 1.45.1 1.6-.63L22.7 5.7c.17-.83-.63-1.5-1.2-1.2Z" />
    <path d="m8 14.6 11-8.6" />
  </svg>
);

export const InstagramIcon = () => (
  <svg {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.2" y1="6.8" x2="17.2" y2="6.8" />
  </svg>
);

export const TikTokIcon = () => (
  <svg {...base}>
    <path d="M13.5 4v10.5a3.75 3.75 0 1 1-3.75-3.75" />
    <path d="M13.5 6.5c.6 2.2 2.4 3.7 4.9 3.9" />
  </svg>
);

export const EmailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 7.6 5.6c.53.4 1.27.4 1.8 0L20.5 7" />
  </svg>
);

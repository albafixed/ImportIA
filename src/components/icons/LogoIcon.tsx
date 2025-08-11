import React from 'react';

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.6"/>
    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M22 7l-10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 8.5l7.5 3.75 7.5-3.75" stroke="var(--bg-color, #050615)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

import type { SVGProps } from 'react';

export function LefiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      aria-label="LEFI Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
      <text
        x="50%"
        y="55%"
        fontFamily="'PT Sans', sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Lf
      </text>
      <path d="M20 80 Q50 70 80 80" stroke="hsl(var(--primary-foreground))" strokeWidth="5" fill="none" opacity="0.5" />
    </svg>
  );
}

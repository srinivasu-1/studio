
import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <defs>
        <clipPath id="circle-clip">
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="80" fill="#00334E" stroke="#FFC107" strokeWidth="4"/>
      
      {/* Sunset stripes */}
      <g clipPath="url(#circle-clip)">
        <rect x="20" y="40" width="160" height="18" fill="#FFC107" />
        <rect x="20" y="58" width="160" height="18" fill="#FFA000" />
        <rect x="20" y="76" width="160" height="18" fill="#FF8F00" />
      </g>
      
      {/* Sun */}
      <circle cx="70" cy="80" r="12" fill="#FFFFFF" />

      {/* Mountains */}
      <g clipPath="url(#circle-clip)">
        <path d="M60,140 L100,60 L120,100 L140,80 L180,140 Z" fill="#2c3e50" />
        <path d="M85,85 l5,-10 l5,10 z" fill="#FFFFFF" />
        <path d="M100,60 l5,-10 l5,10 z" fill="#FFFFFF" />
        <path d="M115,100 l5,-10 l5,10 z" fill="#FFFFFF" />
        <path d="M135,80 l5,-10 l5,10 z" fill="#FFFFFF" />
        <path d="M20,140 L80,90 L110,120 L150,90 L180,140 Z" fill="#34495e" />
         <path d="M95,90 l5,-10 l5,10 z" fill="#FFFFFF" />
         <path d="M125,90 l5,-10 l5,10 z" fill="#FFFFFF" />
      </g>
      
      {/* Water */}
      <g clipPath="url(#circle-clip)">
        <path d="M20,140 Q100,160 180,140 V180 H20 Z" fill="#3498db" />
      </g>
      
      {/* Trees */}
      <g clipPath="url(#circle-clip)" fill="#004d40">
        <path d="M30 140 l10 -20 l10 20z" />
        <path d="M45 140 l10 -20 l10 20z" />
        <path d="M60 140 l10 -20 l10 20z" />
        <path d="M130 140 l10 -20 l10 20z" />
        <path d="M145 140 l10 -20 l10 20z" />
        <path d="M160 140 l10 -20 l10 20z" />
      </g>
      
      {/* Plane */}
      <g transform="translate(130, 60) rotate(20) scale(0.8)">
        <path d="M21 16V8a2 2 0 0 0-2-2h-3l-3-3-2 3H8a2 2 0 0 0-2 2v8l-4 4v2h10v3l-2 2v2h4v-2l-2-2v-3h10v2l4-4Z" fill="#2c3e50" />
      </g>
    </svg>
  );
}

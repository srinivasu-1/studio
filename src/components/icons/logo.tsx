
import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="200"
        height="200"
        {...props}
    >
      <defs>
        <clipPath id="circle-clip">
          <circle cx="100" cy="100" r="90" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="90" stroke="#F2B705" strokeWidth="4" fill="none" />

      <g clipPath="url(#circle-clip)">
        {/* Sky */}
        <rect x="10" y="10" width="180" height="180" fill="#F2B705" />
        <rect x="10" y="10" width="180" height="60" fill="#F29F05" />
        <rect x="10" y="10" width="180" height="40" fill="#F28705" />

        {/* Sun */}
        <circle cx="65" cy="70" r="12" fill="#FFFBEA" />

        {/* Clouds */}
        <path d="M 120 65 a 10 10 0 0 1 0 20 h -30 a 10 10 0 0 1 0 -20 z" fill="#FFFBEA" opacity="0.7" />
        <path d="M 150 55 a 8 8 0 0 1 0 16 h -25 a 8 8 0 0 1 0 -16 z" fill="#FFFBEA" opacity="0.7" />

        {/* Mountains */}
        <path d="M 30 150 l 40 -60 l 30 40 l 40 -70 l 50 90 z" fill="#0E2C40" />
        <path d="M 30 150 l 40 -60 l 10 15 l -20 30z" fill="#FFFFFF" opacity="0.5" />
        <path d="M 70 90 l 30 40 l -10 -5 l-15 -25z" fill="#FFFFFF" opacity="0.3" />
        <path d="M 100 130 l 40 -70 l 10 20 l -30 55z" fill="#FFFFFF" opacity="0.4" />
        
        {/* Water */}
        <rect x="10" y="140" width="180" height="50" fill="#80D0D9" />
        <path d="M 10 145 c 30 -5, 60 5, 90 0 s 60 5, 90 0" stroke="#B3E5EC" strokeWidth="2" fill="none" />
        <path d="M 10 152 c 30 5, 60 -5, 90 0 s 60 -5, 90 0" stroke="#B3E5EC" strokeWidth="2" fill="none" />


        {/* Trees */}
        <path d="M 40 160 l -10 -20 l -10 20 z" fill="#0A2239" />
        <path d="M 60 165 l -12 -25 l -12 25 z" fill="#0A2239" />
        <path d="M 25 170 l -8 -15 l -8 15 z" fill="#0A2239" />
        <path d="M 160 160 l -10 -20 l -10 20 z" fill="#0A2239" />
        <path d="M 180 165 l -12 -25 l -12 25 z" fill="#0A2239" />
        <path d="M 145 170 l -8 -15 l -8 15 z" fill="#0A2239" />
         <path d="M 15 155 l -5 -10 l -5 10 z" fill="#0A2239" />
        <path d="M 188 158 l -6 -12 l -6 12 z" fill="#0A2239" />


        {/* Airplane */}
        <g transform="translate(135, 60) rotate(20)">
            <path d="M 0 0 l 25 10 l -5 -2 l 10 -5 l -20 -10 l -5 10 l 5 2 z" fill="#0E2C40" />
        </g>
      </g>
    </svg>
  );
}

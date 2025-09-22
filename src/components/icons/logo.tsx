
import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <defs>
        <clipPath id="a">
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <circle cx="100" cy="100" r="80" fill="#2d3748" />
        <path fill="#f6ad55" d="M20 100h160v40H20z" />
        <path fill="#fbd38d" d="M20 100h160v13H20z" />
        <path fill="#feeBC8" d="M20 113h160v13H20z" />
        <circle cx="75" cy="90" r="12" fill="#fff" />

        {/* Mountains */}
        <path d="M60 140, 100 80, 140 140Z" fill="#2c5282" />
        <path d="m90 140, 115 0, -20-30, -15 10, -10-20, -10 10z" fill='#2c5282' />
        <path d="m40 140, 75 0, -20-30, -15 10, -10-20, -10 10z" fill='#2c5282' />
        
        {/* Snow caps */}
        <path d="M100 80, 108 95, 92 95z" fill="#edf2f7" />
        <path d="m115 110, 5 5, -10 0z" fill="#edf2f2" />
        <path d="m75 110, 5 5, -10 0z" fill="#edf2f2" />

        {/* Clouds */}
        <path d="M40 80h20v5H40z" fill="#fff" opacity="0.8" />
        <path d="M140 75h25v5h-25z" fill="#fff" opacity="0.8" />


        {/* Water */}
        <path d="M20 140h160v40H20z" fill="#4fd1c5" />
        <path d="M20 140h160v5H20z" fill="#81e6d9" />

        {/* Trees */}
        <path d="m30 140, 5-10, 5 10z" fill="#319795" />
        <path d="m40 140, 5-10, 5 10z" fill="#319795" />
        <path d="m50 140, 5-10, 5 10z" fill="#319795" />
        <path d="m150 140, 5-10, 5 10z" fill="#319795" />
        <path d="m160 140, 5-10, 5 10z" fill="#319795" />
        <path d="m170 140, 5-10, 5 10z" fill="#319795" />
      </g>
      
       {/* Plane */}
      <g transform="translate(110, 65) rotate(20) scale(0.6)">
        <path d="M21 16V8a2 2 0 0 0-2-2h-3l-3-3-2 3H8a2 2 0 0 0-2 2v8l-4 4v2h10v3l-2 2v2h4v-2l-2-2v-3h10v2l4-4Z" fill="#2d3748" />
      </g>
    </svg>
  );
}

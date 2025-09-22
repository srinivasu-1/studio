
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
      <circle cx="100" cy="100" r="80" fill="#f0f9ff" stroke="#e0f2fe" strokeWidth="4"/>

      {/* Sun */}
      <circle cx="100" cy="100" r="40" fill="#fef08a" />
      <circle cx="100" cy="100" r="30" fill="#fde047" />

      {/* Palm Tree 1 */}
      <g transform="translate(60, 90) scale(0.8)">
        <path d="M20 30 Q 22 15, 35 10" stroke="#8d5b30" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M35 10 Q 45 20, 55 10" stroke="#22c55e" fill="#22c55e" />
        <path d="M35 10 Q 30 25, 45 25" stroke="#22c55e" fill="#22c55e" />
        <path d="M35 10 Q 20 20, 15 10" stroke="#22c55e" fill="#22c55e" />
      </g>

       {/* Palm Tree 2 */}
      <g transform="translate(120, 100) scale(0.6)">
        <path d="M20 30 Q 22 15, 35 10" stroke="#a16207" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M35 10 Q 45 20, 55 10" stroke="#16a34a" fill="#16a34a" />
        <path d="M35 10 Q 30 25, 45 25" stroke="#16a34a" fill="#16a34a" />
        <path d="M35 10 Q 20 20, 15 10" stroke="#16a34a" fill="#16a34a" />
      </g>

      {/* Plane */}
      <g transform="translate(40, 60) rotate(-15) scale(0.7)">
        <path d="M21 16V8a2 2 0 0 0-2-2h-3l-3-3-2 3H8a2 2 0 0 0-2 2v8l-4 4v2h10v3l-2 2v2h4v-2l-2-2v-3h10v2l4-4Z" fill="#64748b" />
      </g>
    </svg>
  );
}

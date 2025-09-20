import { SVGProps } from 'react';

export function Motorcycle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m13.4 17.8 2.9-2.9a1 1 0 0 0 .3-1.1V10a2 2 0 0 0-2-2h-3.4" />
      <path d="M17 14.8V19a2 2 0 0 1-2 2h-2.2" />
      <path d="m5 11 2-3" />
      <path d="M6 13h9" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
    </svg>
  );
}

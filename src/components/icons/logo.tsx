
import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M2 12s5.333-2.667 8-4" />
        <path d="M22 2 10 12" />
        <path d="M10 12l12 10" />
        <path d="M2 12l8 12" />
        <path d="M10 12 2 22" />
    </svg>
  );
}

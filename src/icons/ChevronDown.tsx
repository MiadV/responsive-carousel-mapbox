import React from 'react';

export default function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      height='20'
      width='20'
      aria-hidden='true'
      focusable='false'
      fill='currentColor'
      {...props}
    >
      <title>chevron down</title>
      <path
        fillRule='evenodd'
        d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
      ></path>
    </svg>
  );
}

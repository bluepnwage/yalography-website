type PropTypes = {
  size?: number | string;
  className?: string;
};

const defaultStyles = "stroke-gray-500 dark:stroke-gray-100";

export function ClipboardCheck({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <path d="M9 14l2 2 4-4" />
        <rect height="4" width="6" rx="2" x="9" y="3" />
      </g>
    </svg>
  );
}

export function ClipboardMoney({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10" />
        <path d="M12 17v1m0-8v1" />
        <rect height="4" width="6" rx="2" x="9" y="3" />
      </g>
    </svg>
  );
}

export function Home({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M5 12H3l9-9 9 9h-2" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
      </g>
    </svg>
  );
}

export function Books({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" className="fill-gray-500 dark:fill-gray-100">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0 3h4v2h-4v-2zm0-6h8v2h-8V6z" />
      </g>
    </svg>
  );
}

export function Photo({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M15 8h.01" />
        <path d="M4 15l4-4a3 5 0 0 1 3 0l5 5" />
        <path d="M14 14l1-1a3 5 0 0 1 3 0l2 2" />
        <rect height="16" width="16" rx="3" x="4" y="4" />
      </g>
    </svg>
  );
}

export function ListCheck({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M3.5 5.5L5 7l2.5-2.5" />
        <path d="M3.5 11.5L5 13l2.5-2.5" />
        <path d="M3.5 17.5L5 19l2.5-2.5" />
        <path d="M11 6h9" />
        <path d="M11 12h9" />
        <path d="M11 18h9" />
      </g>
    </svg>
  );
}

export function Ballot({ className, size }: PropTypes) {
  return (
    <svg
      height={size || 24}
      width={size || 24}
      className={className ? className : defaultStyles}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M13 7.5h5v2h-5v-2zm0 7h5v2h-5v-2zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6H6v5h5V6zm-1 4H7V7h3v3zm1 3H6v5h5v-5zm-1 4H7v-3h3v3z" />
      </g>
    </svg>
  );
}

type PropTypes = {
  size?: number | string;
  className?: string;
  fill?: boolean;
};

const defaultSize = 24;

export function ClipboardCheck({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
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

export function ClipboardMoney({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
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

export function Home({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
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

export function Books({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0 3h4v2h-4v-2zm0-6h8v2h-8V6z" />
      </g>
    </svg>
  );
}

export function Photo({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
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

export function ListCheck({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
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

export function Ballot({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M13 7.5h5v2h-5v-2zm0 7h5v2h-5v-2zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6H6v5h5V6zm-1 4H7V7h3v3zm1 3H6v5h5v-5zm-1 4H7v-3h3v3z" />
      </g>
    </svg>
  );
}

export function Folders({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
        <path d="M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      </g>
    </svg>
  );
}
export function DotsVertical({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </g>
    </svg>
  );
}

export function Trash({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </g>
    </svg>
  );
}

export function Upload({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 9l5-5 5 5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

export function Download({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 11l5 5 5-5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

export function Edit({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415z" />
        <path d="M16 5l3 3" />
      </g>
    </svg>
  );
}
export function Bouquet({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M37.118,52H26.882l-4.777,9.553A1,1,0,0,0,23,63H41a1,1,0,0,0,.9-1.447Z" />
        <path d="M6.619,27.952l.737-.743a4.194,4.194,0,0,1,5.831,0,6.121,6.121,0,0,0,8.657,0,4.2,4.2,0,0,1,5.828,0,6.127,6.127,0,0,0,8.656,0A4.1,4.1,0,0,1,39.242,26h0a4.091,4.091,0,0,1,2.914,1.207,6.132,6.132,0,0,0,8.656,0,4.2,4.2,0,0,1,5.829,0l.739.745.708-.779a1,1,0,0,0-.033-1.38,6.121,6.121,0,0,0-8.657,0,4.128,4.128,0,0,1-5.829,0,6.127,6.127,0,0,0-8.656,0,4.125,4.125,0,0,1-5.828,0,6.127,6.127,0,0,0-8.657,0,4.121,4.121,0,0,1-5.828,0,6.121,6.121,0,0,0-8.657,0,1,1,0,0,0-.033,1.38Z" />
        <path d="M55.226,28.619a2.279,2.279,0,0,0-3,0,8.136,8.136,0,0,1-11.486,0,2.175,2.175,0,0,0-3,0,8.126,8.126,0,0,1-11.484,0,2.287,2.287,0,0,0-3,0,8.121,8.121,0,0,1-11.487,0,2.277,2.277,0,0,0-3,0l-.807.813L26.649,50H31V45a1,1,0,0,1,2,0v5h4.351L56.035,29.434Z" />
        <path d="M20,10V6.019A9.983,9.983,0,0,0,16,14a1,1,0,0,1-2,0,11.92,11.92,0,0,1,2.29-7.023A14.51,14.51,0,0,0,8,4,1,1,0,0,0,7,5v8a9.991,9.991,0,0,0,17.629,6.45A11.974,11.974,0,0,1,20,10Z" />
        <path d="M44,10V6.019A9.983,9.983,0,0,1,48,14a1,1,0,0,0,2,0,11.92,11.92,0,0,0-2.29-7.023A14.51,14.51,0,0,1,56,4a1,1,0,0,1,1,1v8a9.991,9.991,0,0,1-17.629,6.45A11.974,11.974,0,0,0,44,10Z" />
        <path d="M41,1a14.51,14.51,0,0,0-8.29,2.977A11.92,11.92,0,0,1,35,11a1,1,0,0,1-2,0A10.011,10.011,0,0,0,23,1a1,1,0,0,0-1,1v8a10.013,10.013,0,0,0,9,9.949V23a1,1,0,0,0,2,0V19.949A10.013,10.013,0,0,0,42,10V2A1,1,0,0,0,41,1Z" />
      </g>
    </svg>
  );
}

export function Person({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41-4.47-4.48z" />
      </g>
    </svg>
  );
}

export function Ballon({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M14 8a2 2 0 0 0-2-2" />
        <path d="M6 8a6 6 0 1 1 12 0c0 4.97-2.686 9-6 9s-6-4.03-6-9" />
        <path d="M12 17v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2" />
      </g>
    </svg>
  );
}

export function BoxArchive({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M32 432c0 26.5 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160H32v272zm128-196c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H172c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.31 32 0 46.31 0 64v48c0 8.8 7.188 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.69-14.3-32-32-32z" />
      </g>
    </svg>
  );
}

export function Maternity({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M2 5h2.5l1.632 4.897A6 6 0 0 0 11.825 14H14.5a5.5 5.5 0 0 0 0-11H14v6" />
        <path d="M6 9h14" />
        <path d="M9 17l1-3" />
        <path d="M16 14l1 3" />
        <circle cx="8" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </g>
    </svg>
  );
}

export function Globe({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.1-20.4-4.2-41.8-4.2-64 0-22.2 2.1-43.6 4.2-64h185.4c2.1 20.4 3.3 41.8 3.3 64zm151.9-64c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42.9 3.2-64 0-22-1.1-43.4-3.2-64h123.1zm-10.5-32H376.7c-10-63.86-29.8-117.38-55.3-151.558C399.8 29.09 463.4 85.94 493.4 160zm-149.1 0H167.7c6.1-36.4 15.5-68.62 27-94.65 10.5-23.61 22.2-40.74 33.5-51.54C239.4 3.178 248.7 0 256 0c7.3 0 16.6 3.178 27.8 13.81 11.3 10.8 23 27.93 33.5 51.54 11.5 26.03 20.9 58.25 27 94.65zm-325.69 0C48.59 85.94 112.2 29.09 190.6 8.442 165.1 42.62 145.3 96.14 135.3 160H18.61zm112.59 32c-2.1 20.6-4.1 42-4.1 64 0 21.1 2 43.4 4.1 64H8.065C2.8 299.5 0 278.1 0 256s2.8-43.5 8.065-64H131.2zm63.5 254.6c-11.5-26-20.9-58.2-27-94.6h176.6c-6.1 36.4-15.5 68.6-27 94.6-10.5 23.7-22.2 40.8-33.5 51.6-11.2 10.6-20.5 13.8-28.7 13.8-6.4 0-15.7-3.2-26.9-13.8-11.3-10.8-23-27.9-33.5-51.6zm-4.1 57C112.2 482.9 48.59 426.1 18.61 352H135.3c10 63.9 29.8 117.4 55.3 151.6zm130.8 0c25.5-34.2 45.3-87.7 55.3-151.6h116.7c-30 74.1-93.6 130.9-172 151.6z" />
      </g>
    </svg>
  );
}

export function Email({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </g>
    </svg>
  );
}

export function Location({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </g>
    </svg>
  );
}

export function Phone({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </g>
    </svg>
  );
}

export function Facebook({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7" />
      </g>
    </svg>
  );
}

export function Instagram({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M16.5 7.5v.001" />
        <rect height="16" width="16" rx="4" x="4" y="4" />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  );
}

export function ChevronDown({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M6 9l6 6 6-6" />
      </g>
    </svg>
  );
}

export function Check({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M5 12l5 5L20 7" />
      </g>
    </svg>
  );
}

export function XClose({ className, size, fill }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
      </g>
    </svg>
  );
}

export function CircleCheck({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </g>
    </svg>
  );
}

export function CalendarTime({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      viewBox="0 0 24 24"
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M11.795 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M15 3v4" />
        <path d="M7 3v4" />
        <path d="M3 11h16" />
        <path d="M18 16.496V18l1 1" />
        <circle cx="18" cy="18" r="4" />
      </g>
    </svg>
  );
}

export function PushPin({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1z" />
      </g>
    </svg>
  );
}

export function PushPinOutline({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <path
          d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

export function Pinned({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 4v6l-2 4v2h10v-2l-2-4V4" />
        <path d="M12 16v5" />
        <path d="M8 4h8" />
      </g>
    </svg>
  );
}

export function Pin({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M15 4.5l-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4" />
        <path d="M9 15l-4.5 4.5" />
        <path d="M14.5 4L20 9.5" />
      </g>
    </svg>
  );
}

export function Plus({ className, fill, size }: PropTypes) {
  return (
    <svg
      height={size || defaultSize}
      width={size || defaultSize}
      className={className ? className : fill ? "icon-fill" : "icon-stroke"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </g>
    </svg>
  );
}

function Zoom() {
  return (
    <svg height="12" width="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <g fill="#ffffff" stroke="#ffffff" strokeWidth="1">
        <line fill="none" strokeLinecap="round" strokeLinejoin="round" x1="11.5" x2="8.328" y1="11.5" y2="8.328" />
        <circle cx="5.5" cy="5.5" fill="none" r="4" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Copy() {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

function Share() {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M8.7 10.7l6.6-3.4" />
        <path d="M8.7 13.3l6.6 3.4" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
      </g>
    </svg>
  );
}

function Unlink() {
  return (
    <svg height="512" width="448" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M10 14a3.5 3.5 0 0 0 4.47.444m2.025-1.94c.557-.556 1.392-1.39 2.505-2.504a3.536 3.536 0 0 0-5-5l-.5.5" />
        <path d="M9.548 9.544A3.5 3.5 0 0 0 9 10l-4 4a3.536 3.536 0 0 0 5 5l.5-.5" />
        <path d="M3 3l18 18" />
        <path d="M3 3l18 18" />
      </g>
    </svg>
  );
}

function Menu2() {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </g>
    </svg>
  );
}

export interface IconProps {
  size?: number;
}

export function Bouquet({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <title>Bouquet</title>
      <g fill="#ffffff">
        <path d="M37.118,52H26.882l-4.777,9.553A1,1,0,0,0,23,63H41a1,1,0,0,0,.9-1.447Z" fill="#ffffff" />
        <path
          d="M6.619,27.952l.737-.743a4.194,4.194,0,0,1,5.831,0,6.121,6.121,0,0,0,8.657,0,4.2,4.2,0,0,1,5.828,0,6.127,6.127,0,0,0,8.656,0A4.1,4.1,0,0,1,39.242,26h0a4.091,4.091,0,0,1,2.914,1.207,6.132,6.132,0,0,0,8.656,0,4.2,4.2,0,0,1,5.829,0l.739.745.708-.779a1,1,0,0,0-.033-1.38,6.121,6.121,0,0,0-8.657,0,4.128,4.128,0,0,1-5.829,0,6.127,6.127,0,0,0-8.656,0,4.125,4.125,0,0,1-5.828,0,6.127,6.127,0,0,0-8.657,0,4.121,4.121,0,0,1-5.828,0,6.121,6.121,0,0,0-8.657,0,1,1,0,0,0-.033,1.38Z"
          fill="#ffffff"
        />
        <path
          d="M55.226,28.619a2.279,2.279,0,0,0-3,0,8.136,8.136,0,0,1-11.486,0,2.175,2.175,0,0,0-3,0,8.126,8.126,0,0,1-11.484,0,2.287,2.287,0,0,0-3,0,8.121,8.121,0,0,1-11.487,0,2.277,2.277,0,0,0-3,0l-.807.813L26.649,50H31V45a1,1,0,0,1,2,0v5h4.351L56.035,29.434Z"
          fill="#ffffff"
        />
        <path d="M20,10V6.019A9.983,9.983,0,0,0,16,14a1,1,0,0,1-2,0,11.92,11.92,0,0,1,2.29-7.023A14.51,14.51,0,0,0,8,4,1,1,0,0,0,7,5v8a9.991,9.991,0,0,0,17.629,6.45A11.974,11.974,0,0,1,20,10Z" />
        <path d="M44,10V6.019A9.983,9.983,0,0,1,48,14a1,1,0,0,0,2,0,11.92,11.92,0,0,0-2.29-7.023A14.51,14.51,0,0,1,56,4a1,1,0,0,1,1,1v8a9.991,9.991,0,0,1-17.629,6.45A11.974,11.974,0,0,0,44,10Z" />
        <path d="M41,1a14.51,14.51,0,0,0-8.29,2.977A11.92,11.92,0,0,1,35,11a1,1,0,0,1-2,0A10.011,10.011,0,0,0,23,1a1,1,0,0,0-1,1v8a10.013,10.013,0,0,0,9,9.949V23a1,1,0,0,0,2,0V19.949A10.013,10.013,0,0,0,42,10V2A1,1,0,0,0,41,1Z" />
      </g>
    </svg>
  );
}

export function Person({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Person waving</title>
      <g fill="none">
        <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#ffffff" />
        <path
          d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41-4.47-4.48z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

export function Ballon({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Ballon</title>
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M14 8a2 2 0 0 0-2-2" />
        <path d="M6 8a6 6 0 1 1 12 0c0 4.97-2.686 9-6 9s-6-4.03-6-9" />
        <path d="M12 17v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2" />
      </g>
    </svg>
  );
}

export function BoxArchive({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <title>Box</title>
      <g fill="#ffffff">
        <path d="M32 432c0 26.5 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160H32v272zm128-196c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H172c-6.6 0-12-5.4-12-12v-8zM480 32H32C14.31 32 0 46.31 0 64v48c0 8.8 7.188 16 16 16h480c8.8 0 16-7.2 16-16V64c0-17.69-14.3-32-32-32z" />
      </g>
    </svg>
  );
}

export function Maternity({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Baby Cariirage</title>
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
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

export function Family({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Family</title>
      <g fill="none">
        <path
          d="M16 4c0-1.11.89-2 2-2 1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18.06 7h-.12a2 2 0 0 0-1.9 1.37l-.86 2.58c1.08.6 1.82 1.73 1.82 3.05v8h3zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2 0-1.11-.89-2-2-2-1.11 0-2 .89-2 2 0 1.11.89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5 0v-4h1v-4c0-.82-.68-1.5-1.5-1.5h-2c-.82 0-1.5.68-1.5 1.5v4h1v4h3z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

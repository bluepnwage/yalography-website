interface IconProps {
  size?: number;
}

export function Email({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Email</title>
      <g fill="none">
        <path
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

export function Location({ size }: IconProps) {
  return (
    <svg height={size || 24} width={size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Location</title>
      <g fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
          fill="#ffffff"
        />
      </g>
    </svg>
  );
}

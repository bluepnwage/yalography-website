interface PropTypes extends ComponentProps {
  width?: string;
  gap?: string;
  rows?: string;
  cols?: string;
}
export function Grid({ children, width = "", gap = "", cols = "grid-cols-12", rows = "" }: PropTypes) {
  return <div className={`grid ${width} ${gap} grid-cols-6 lg:${cols} ${rows}`}>{children}</div>;
}

"use client";

type ChartData = {
  _count: number;
  type: string;
};

type PropTypes = {
  data: ChartData[];
};

export function BookingsTotal({ data }: PropTypes) {
  const total = data.reduce((a, c) => a + c._count, 0);
  return (
    <div className="grow flex items-center justify-center">
      <p className="font-bold text-8xl text-center ">{total}</p>
    </div>
  );
}

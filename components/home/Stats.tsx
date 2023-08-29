const statList = [
  { title: "Photos taken", stat: 5000 },
  { title: "Projects Completed", stat: 300 },
  { title: "Satisfied Customers", stat: 500 }
];

export function Stats() {
  return (
    <div className="flex justify-between mb-10 gap-5 lg:gap-0 flex-wrap flex-col lg:flex-row">
      {statList.map(stat => {
        return (
          <div className="space-y-2 grow basis-1/3 text-center lg:text-start" key={stat.title}>
            <p className="text-primary-500 dark:text-primary-300 font-heading font-bold text-2xl">
              {stat.stat}+
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
}

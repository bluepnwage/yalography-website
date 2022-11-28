const statList = [
  { title: "Photos taken", stat: 5000 },
  { title: "Projects Completed", stat: 500 },
  { title: "Happy Clients", stat: 300 }
];

export function Stats() {
  return (
    <div className="flex justify-between mb-10 gap-5 lg:gap-0 flex-wrap flex-col lg:flex-row">
      {statList.map((stat) => {
        return (
          <div className="space-y-2 grow basis-1/3 text-center lg:text-start" key={stat.title}>
            <p className="text-red-600 dark:text-red-500 font-bold text-xl">{stat.stat}+</p>
            <p className="text-lg ">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
}

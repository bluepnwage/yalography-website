import { Section } from "@components/shared";
const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-rose-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-gray-400",
  "bg-green-400",
  "bg-orange-400",
  "bg-emerald-400"
];

const images = Array(30).fill(null);

export function Gallery() {
  return (
    <Section className="mt-20">
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gridAutoRows: "240px" }}
        className="grid grid-flow-dense gap-3 w-11/12"
      >
        {images.map((_, key) => {
          const bg = colors[Math.floor(Math.random() * colors.length)];
          const random = Math.random();
          const span = random < 0.3 ? "col-span-2" : random < 0.7 ? "row-span-2" : "";
          return <div key={key} className={`${bg}  h-full ${span}`}></div>;
        })}
      </div>
    </Section>
  );
}

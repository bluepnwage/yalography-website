import { Title, Section, Grid, Button } from "@components/shared";

const companies = [
  "Tourism Office SXM",
  "Real Estate",
  "Paco Rabanne",
  "SXM Wedding Expo",
  "Valentino Miami",
  "Collectivite"
];
export function LogoCloud() {
  return (
    <Section margin={false} className="bg-gray-50 dark:bg-zinc-800 px-5 py-16">
      <div className="w-full gap-5 flex ">
        <div className="basis-3/5 grow pr-5 space-y-4">
          <Title order={"h2"}>The world&apos;s most innovative companies use Yalography</Title>
          <p className="text-xl">
            Each of these companies have been able to take advantage of my photography services, and have been satisfied
            with the results. I am proud to have been able to work with these companies, and I look forward to the
            opportunity of working with more businesses in the future.
          </p>
          <Button component={"a"} href={"/"} className="py-4 px-6">
            Contact me
          </Button>
        </div>
        <Grid lg={2} gap={"none"} className="basis-2/5 grow gap-1">
          {companies.map((company, key) => {
            return <Company companyName={company} key={key} />;
          })}
        </Grid>
      </div>
    </Section>
  );
}

type PropTypes = {
  companyName: string;
};
function Company({ companyName }: PropTypes) {
  return (
    <div className="bg-gray-200 dark:bg-zinc-600 bg-opacity-40 dark:bg-opacity-40 py-7">
      <p className="font-semibold text-slate-500 dark:text-slate-100 text-xl text-center ">{companyName}</p>
    </div>
  );
}

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
            Sunt eu sunt duis commodo ad irure. In enim enim labore occaecat irure excepteur enim cupidatat sit commodo
            qui ipsum elit. Aliqua sunt aute excepteur fugiat dolor commodo.
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

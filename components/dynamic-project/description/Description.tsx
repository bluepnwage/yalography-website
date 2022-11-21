import { Title, Grid, Section } from "@components/shared";

export function Descrption() {
  return (
    <Grid lg={2} className="mb-36 w-full">
      <div>
        <header className="mb-5">
          <Title order={"h2"} size={"md"} color={"red"}>
            Overview
          </Title>
          <Title order={"h3"}>Random title to introduce project</Title>
        </header>
        <p className="text-lg">
          Fugiat culpa officia laboris aute dolore incididunt pariatur Lorem officia. Pariatur esse commodo nostrud
          irure proident sunt proident adipisicing. Ullamco duis est ullamco voluptate commodo laborum minim occaecat
          fugiat dolore sunt amet. Id aliqua amet nisi voluptate.
        </p>
      </div>
      <div className="bg-zinc-800 rounded-md p-5">
        <p className="text-center text-red-500 mb-5">Testimonial</p>
        <p className="text-lg mb-5">
          Consequat laborum tempor laborum enim cillum magna nulla fugiat magna et duis. Ut anim excepteur et mollit id
          deserunt dolore occaecat veniam. Adipisicing deserunt ad ipsum magna id nisi aliqua eiusmod incididunt
          incididunt ea non veniam id. Nisi proident proident et fugiat cupidatat cupidatat adipisicing.
        </p>
        <strong>Agis Carty</strong>
        <p className="text-red-500 text-sm mt-5">CEO, Bluepnwage Enterprises</p>
      </div>
    </Grid>
  );
}

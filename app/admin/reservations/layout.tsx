import { Anchor, Button, FlexContainer } from "@components/shared";

type PropTypes = {
  children: React.ReactNode;
};
export default function Layout({ children }: PropTypes) {
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly">
          <div>
            <p>Pending reservations: 34</p>
            <Anchor href={"/admin/reservations/pending"}>View pending reservations</Anchor>
          </div>
          <div>
            <p>Approved reservations: 30</p>
            <Anchor href={"/admin/reservations/approved"}>View approved reservations</Anchor>
          </div>
          <Button>Create Reservation</Button>
        </FlexContainer>
      </div>
      {children}
    </>
  );
}

import { Anchor, FlexContainer } from "@components/shared";
import { BookingsProvider } from "@components/admin/bookings/BookingsProvider";
import { UploadDialog } from "@components/admin/gallery/UploadDialog";

import prisma from "@lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <div className="text-center">
            <p>Total images: 456</p>
          </div>
          <div className="text-center">
            <p>Total folders: 3</p>
          </div>
          <UploadDialog />
        </FlexContainer>
      </div>
      {children}
      {/* <BookingsProvider {...bookings}>{children}</BookingsProvider> */}
    </>
  );
}

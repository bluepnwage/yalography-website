import { Card, Skeleton } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import prisma from "@lib/prisma";

async function getPinnedLists() {
  await prisma.$connect();
  const lists = await prisma.taskLists.findMany({ where: { pinned: true }, take: 3 });
  await prisma.$disconnect();
  return lists;
}

export async function PinedLists() {
  const pinnedLists = await getPinnedLists();
  return (
    <>
      {pinnedLists.map((list, key) => {
        return (
          <Card key={key} className="col-span-4">
            <div className="flex justify-between mb-5">
              <p className="font-semibold text-lg">{list.name}</p>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <button>
                    <DotsVertical size={16} />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item>Delete</Dropdown.Item>
                  <Dropdown.Item>Unpin</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
            <p className="text-gray-400">Pending tasks: 3</p>
            <p className="text-gray-400">Total tasks: 5</p>
          </Card>
        );
      })}
    </>
  );
}

export function PinnedListsLoading() {
  const pinnedCards = Array(3).fill(null);
  return (
    <>
      {pinnedCards.map((_, key) => {
        return (
          <Card key={key} className="col-span-4 relative overflow-hidden">
            <Skeleton.Shimmer />
            <div className="flex justify-between mb-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton radius={"full"} className="w-3 h-7" />
            </div>
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-3 w-10" />
          </Card>
        );
      })}
    </>
  );
}

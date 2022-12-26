import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function useRouteRefresh(): [boolean, () => void] {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return [isPending, refresh];
}

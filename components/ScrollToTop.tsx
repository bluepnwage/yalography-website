import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);
  return <></>;
}

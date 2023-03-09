"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Admin = dynamic(() => import("./Admin").then(mod => mod.Admin));

export function AdminWrapper() {
  const searchParams = useSearchParams();
  return <>{searchParams && searchParams.get("admin") && <Admin />}</>;
}

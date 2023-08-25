// "use client";
// import { ActionIcon } from "@/components/shared/ActionIcon";
// import { Share, Trash, Pin, Unpin } from "@/lib/icons";
// import { Tooltip } from "@/components/shared/Tooltip";

// import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
// import { useToggle } from "@/lib/hooks/useToggle";
// import { useRouter } from "next/navigation";

// import type { Env } from "@/lib/firebase/storage";

// type PropTypes = {
//   id: number;
//   published: boolean;
//   projectName: string;
//   pinned: boolean;
// } & Env;

// export function ProjectMenu({ id, published, projectName, pinned, environment }: PropTypes) {
//   const [isPending, refresh] = useRouteRefresh();
//   const [loading, toggle] = useToggle();
//   const router = useRouter();

//   const onDelete = async () => {
//     toggle.on();
//     const { toast } = await import("react-toastify");

//     const endpoint = new URL("/api/projects", location.origin);
//     endpoint.searchParams.set("revalidate", published ? "1" : "0");
//     const toastID = toast.loading("Deleting project.");
//     try {
//       const res = await fetch(endpoint, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id })
//       });
//       const json = await res.json();
//       if (res.ok) {
//         toast.dismiss(toastID);
//         toast.success(json.message);
//         refresh();
//         router.push("/admin/projects");
//       } else {
//         throw new Error(json.message);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.dismiss(toastID);
//         toast.error(error.message);
//       }
//     } finally {
//       toggle.off();
//     }
//   };

//   const onShare = async () => {
//     await navigator.share({ url: `${location.origin}/projects/${id}`, title: "Project" });
//   };

//   const onPin = async () => {
//     toggle.on();
//     const { toast } = await import("react-toastify");
//     const endpoint = new URL("/api/projects", location.origin);
//     endpoint.searchParams.set("revalidate_home", "1");
//     endpoint.searchParams.set("pin", pinned ? "0" : "1");
//     const toastID = toast.loading(pinned ? "Remove project from homepage" : "Pinning project to homepage");
//     try {
//       const res = await fetch(endpoint, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, pinned: !pinned })
//       });
//       const json = await res.json();
//       if (res.ok) {
//         refresh();
//         toast.dismiss(toastID);
//         toast.success(pinned ? "Project unpinned from homepage" : "Project pinned to homepage");
//       } else {
//         if (res.status === 400) {
//           toast.error(json.message);
//           toast.dismiss(toastID);
//         } else {
//           throw new Error(json.message);
//         }
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.dismiss(toastID);
//         toast.error(
//           `There was an error ${pinned ? "removing the project from" : "pinning the project to"} homepage`
//         );
//       }
//     } finally {
//       toggle.off();
//     }
//   };

//   const isLoading = isPending || loading;

//   return (
//     <div className="flex gap-2 self-center h-fit">
//       <Tooltip content={pinned ? "Unpin from homepage" : "Pin to homepage"}>
//         <ActionIcon
//           className="p-1"
//           disabled={isLoading}
//           onClick={onPin}
//           color={pinned ? "orange" : "emerald"}
//           aria-label={pinned ? "Unpin from homepage" : "Pin to homepage"}
//         >
//           {pinned ? <Unpin /> : <Pin />}
//         </ActionIcon>
//       </Tooltip>
//       {published && (
//         <Tooltip content="Share project">
//           <ActionIcon aria-label="Share project" onClick={onShare} color="violet" className="p-1">
//             <Share />
//           </ActionIcon>
//         </Tooltip>
//       )}
//       <Tooltip content="Delete project">
//         <ActionIcon
//           disabled={isLoading}
//           onClick={onDelete}
//           aria-label="Delete project"
//           color="red"
//           className="p-1"
//         >
//           <Trash />
//         </ActionIcon>
//       </Tooltip>
//     </div>
//   );
// }

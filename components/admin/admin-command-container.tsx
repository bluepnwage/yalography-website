import { AdminCommand } from "./command";
import { getBookings, getProjects, getTasks } from "@/lib/admin-data";

export async function AdminCommandContainer() {
  const projectPromise = getProjects();
  const bookingsPromise = getBookings();
  const tasksPromise = getTasks();
  const [projects, bookings, tasks] = await Promise.all([projectPromise, bookingsPromise, tasksPromise]);
  return (
    <>
      <AdminCommand bookings={bookings} projects={projects} tasks={tasks} />
    </>
  );
}

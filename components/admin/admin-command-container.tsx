import { AdminCommand } from "./command";
import { getBookings, getProjects, getTasks } from "@/lib/admin-data";
import { AdminProvider } from "./command-provider";

export async function AdminCommandContainer() {
  const projectPromise = getProjects();
  const bookingsPromise = getBookings();
  const tasksPromise = getTasks();
  const [projects, bookings, tasks] = await Promise.all([projectPromise, bookingsPromise, tasksPromise]);

  return (
    <AdminProvider>
      <AdminCommand bookings={bookings} projects={projects} tasks={tasks} />
    </AdminProvider>
  );
}

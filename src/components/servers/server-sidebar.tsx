import { getAuthSession } from "@/lib/nextauth";
import ServerHeader from "./server-header";
import { getFullServerById } from "@/services/servers.service";
import { redirect } from "next/navigation";

interface Props {
  serverId: string;
}

export default async function ServerSidebar({ serverId }: Props) {
  const session = await getAuthSession();

  const server = await getFullServerById(serverId);

  if (!server) {
    redirect("/");
  }

  const role = server.members.find(
    (member) => member.userId === session?.user.id
  )?.role;

  if (!role) {
    redirect("/");
  }

  return (
    <aside>
      <ServerHeader server={server} role={role} />
    </aside>
  );
}

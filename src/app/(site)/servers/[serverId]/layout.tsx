import ServerSidebar from "@/components/servers/server-sidebar";
import { getServerById } from "@/services/servers.service";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}

export default async function ServersLayout({ children, params }: Props) {
  const server = await getServerById(params.serverId);

  if (!server) {
    redirect("/");
  }

  return (
    <div className="flex h-full">
      <div className="bg-zinc-800 rounded-tl-md w-[225px]">
        <ServerSidebar serverId={server.id} />
      </div>
      <div className="bg-zinc-700 flex-1 rounded-br-md">{children}</div>
    </div>
  );
}

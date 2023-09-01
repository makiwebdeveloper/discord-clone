import { getAuthSession } from "@/lib/nextauth";
import { getServerById } from "@/services/servers.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    serverId: string;
  };
}

export default async function page({ params }: Props) {
  const session = await getAuthSession();

  const server = await getServerById(params.serverId);

  if (!server) {
    redirect("/");
  }

  if (!server.members.find((member) => member.userId === session?.user.id)) {
    redirect("/");
  }

  return <div>page</div>;
}

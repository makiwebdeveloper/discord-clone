import Loader from "@/components/loader";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/users.service";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface Props {
  params: {
    inviteCode: string;
  };
}

export default async function Invite({ params }: Props) {
  const currentUser = await getCurrentUser();

  if (!params.inviteCode || !currentUser) {
    redirect("/");
  }

  const checkedServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: currentUser.id,
        },
      },
    },
  });

  if (checkedServer) {
    redirect(`/servers/${checkedServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          userId: currentUser.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <div className="center h-full ">
      <Loader />
    </div>
  );
}

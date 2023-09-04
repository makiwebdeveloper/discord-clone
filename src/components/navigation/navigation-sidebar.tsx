import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import CreateServerButton from "./create-server-button";
import NavigationItem from "./navigation-item";
import { getAuthSession } from "@/lib/nextauth";
import { db } from "@/lib/db";
import NavigationMeItem from "./navigation-me-item";
import { getServersByUserId } from "@/services/servers.service";

export default async function Servers() {
  const session = await getAuthSession();

  const servers = await getServersByUserId(session?.user.id!);

  return (
    <ScrollArea className="w-24 pb-3">
      <div className="space-y-3">
        <NavigationMeItem />
        <Separator className="h-[3px] rounded-full w-2/4 mx-auto bg-zinc-600" />
        <CreateServerButton />
        {servers.map((server, index) => (
          <NavigationItem key={index} server={server} />
        ))}
      </div>
    </ScrollArea>
  );
}

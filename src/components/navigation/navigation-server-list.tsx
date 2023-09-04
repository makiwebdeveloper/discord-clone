"use client";

import { Server } from "@prisma/client";
import NavigationItem from "./navigation-item";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";

interface Props {
  userId: string;
  initialServers: Server[];
}

export default function NavigationServerList({
  initialServers,
  userId,
}: Props) {
  const { data: servers } = useQuery(
    [`servers ${userId}`],
    async () => {
      const url = qs.stringifyUrl({
        url: "/api/servers",
        query: {
          userId,
        },
      });

      const res = await axios.get<{ servers: Server[] }>(url);
      return res.data.servers;
    },
    {
      initialData: initialServers,
    }
  );

  return (
    <>
      {servers.map((server, index) => (
        <NavigationItem key={index} server={server} />
      ))}
    </>
  );
}

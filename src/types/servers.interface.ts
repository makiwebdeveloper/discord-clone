import { Channel, Member, Server, User } from "@prisma/client";

export interface IMemberWithUser extends Member {
  user: User;
}

export interface IFullServer extends Server {
  owner: User;
  channels: Channel[];
  members: IMemberWithUser[];
}
